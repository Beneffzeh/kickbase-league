/*
=========================================
KICKBASE LEAGUE – SAISONPROGNOSE
Version 1.0
=========================================

Die Prognose nutzt:

- Saisonleistung
- aktuelle Form
- individuelle Schwankung
- Regression zum Liga-Durchschnitt
- optionalen Kaderfaktor

Anschließend wird die restliche
Qualifikation 10.000-mal simuliert.

QUALIFIKATIONSREGEL:

- Platz 1–4 Gruppe A -> Champions League
- Platz 1–4 Gruppe B -> Champions League
- Die beiden Fünftplatzierten werden
  miteinander verglichen.
- Der punktbessere Fünfte erhält den
  neunten Champions-League-Platz.

=========================================
*/


const predictionConfig = {

    /*
    Anzahl der Simulationen.
    */

    simulations: 10000,


    /*
    Die Qualifikation läuft über
    14 Spieltage.
    */

    qualificationMatchdays: 14,


    /*
    Gewichtung der bisherigen Saison.
    */

    seasonWeight: 0.70,


    /*
    Gewichtung der aktuellen Form.
    */

    formWeight: 0.30,


    /*
    Anzahl der Spieltage für die
    Formbewertung.
    */

    formMatchdays: 5,


    /*
    Nach 5 echten Spieltagen vertrauen
    wir vollständig den individuellen
    Leistungsdaten.

    Vorher wird stärker zum
    Liga-Durchschnitt zurückgezogen.
    */

    fullConfidenceAfter: 5,


    /*
    Mindestschwankung.

    Dadurch sind Simulationen auch bei
    sehr konstanten bisherigen Ergebnissen
    nicht unrealistisch starr.
    */

    minimumDeviation: 180

};


/*
=========================================
OPTIONALER KADERFAKTOR
=========================================

Hier können später außergewöhnliche
Kaderereignisse berücksichtigt werden.

adjustment bedeutet:

erwartete Veränderung der Punkte
PRO zukünftigem Spieltag.

Beispiel:

reichi: {
    adjustment: -120,
    reason: "Ausfall Schlüsselspieler"
}

Dann bleiben Reichis bereits erzielte
Punkte unangetastet.

Nur seine zukünftigen simulierten
Spieltage werden um ungefähr
120 Punkte schwächer erwartet.

=========================================
*/


const predictionAdjustments = {

    ben: {
        adjustment: 0,
        reason: ""
    },

    bruno: {
        adjustment: 0,
        reason: ""
    },

    enrico: {
        adjustment: 0,
        reason: ""
    },

    fabio: {
        adjustment: 0,
        reason: ""
    },

    heiko: {
        adjustment: 0,
        reason: ""
    },

    janis: {
        adjustment: 0,
        reason: ""
    },

    malik: {
        adjustment: 0,
        reason: ""
    },

    marco: {
        adjustment: 0,
        reason: ""
    },

    marcel: {
        adjustment: 0,
        reason: ""
    },

    messe: {
        adjustment: 0,
        reason: ""
    },

    nikolaj: {
        adjustment: 0,
        reason: ""
    },

    nils: {
        adjustment: 0,
        reason: ""
    },

    philipp: {
        adjustment: 0,
        reason: ""
    },

    reichi: {
        adjustment: 0,
        reason: ""
    },

    sauer: {
        adjustment: 0,
        reason: ""
    },

    schwartzer: {
        adjustment: 0,
        reason: ""
    },

    tim: {
        adjustment: 0,
        reason: ""
    },

    tobsen: {
        adjustment: 0,
        reason: ""
    }

};


/*
=========================================
HAUPTFUNKTION
QUALIFIKATIONSPROGNOSE
=========================================
*/


function calculateQualificationPrediction() {

    /*
    Prüfen, ob league-data.js
    korrekt geladen wurde.
    */

    if (
        typeof leagueData === "undefined"
    ) {

        console.error(
            "league-data.js wurde nicht geladen."
        );

        return null;

    }


    /*
    Vor der Prognose sicherstellen,
    dass alle Ligadaten aktuell
    berechnet wurden.
    */

    if (
        typeof recalculateLeagueData ===
        "function"
    ) {

        recalculateLeagueData();

    }


    /*
    Beide Qualifikationsgruppen holen.
    */

    const groupA =
        getPredictionQualificationManagers(
            "A"
        );


    const groupB =
        getPredictionQualificationManagers(
            "B"
        );


    /*
    Sicherheitsprüfung.
    */

    if (
        groupA.length !== 9 ||
        groupB.length !== 9
    ) {

        console.error(
            "Für die Prognose müssen beide Qualifikationsgruppen jeweils 9 Manager enthalten."
        );

        return null;

    }


    /*
    Ergebnisobjekt vorbereiten.
    */

    const results = {};


    leagueData.managers.forEach(
        manager => {

            results[
                manager.id
            ] = {

                managerId:
                    manager.id,

                name:
                    manager.name,

                group:
                    manager
                        .qualification
                        .group,

                simulations:
                    predictionConfig
                        .simulations,


                /*
                Anzahl der Simulationen,
                in denen der Manager
                Champions League erreicht.
                */

                championsLeague:
                    0,


                /*
                Anzahl direkter
                Qualifikationen über
                Platz 1–4.
                */

                directQualification:
                    0,


                /*
                Anzahl Qualifikationen
                als besserer Fünfter.
                */

                fifthPlaceQualification:
                    0,


                /*
                Gruppensiege.
                */

                firstPlace:
                    0,


                /*
                Häufigkeit jeder
                Endplatzierung.
                */

                positionCounts: {

                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: 0,
                    9: 0

                },


                /*
                Wird später für den
                durchschnittlichen
                Endplatz benötigt.
                */

                totalFinalPosition:
                    0,


                /*
                Erwartete zukünftige
                Spieltagsleistung.
                */

                expectedScore:
                    getPredictionExpectedScore(
                        manager,
                        "qualification"
                    ),


                /*
                Aktueller Kaderfaktor.
                */

                adjustment:
                    getPredictionAdjustment(
                        manager.id
                    ),


                /*
                Grund für einen eventuell
                gesetzten Kaderfaktor.
                */

                adjustmentReason:
                    getPredictionAdjustmentReason(
                        manager.id
                    )

            };

        }
    );


    /*
    =====================================
    10.000 SAISONS SIMULIEREN
    =====================================
    */


    for (
        let simulation = 0;
        simulation <
            predictionConfig.simulations;
        simulation++
    ) {

        /*
        Beide Gruppen unabhängig
        simulieren.
        */

        const simulatedA =
            simulateQualificationGroup(
                groupA
            );


        const simulatedB =
            simulateQualificationGroup(
                groupB
            );


        /*
        =================================
        PLÄTZE 1–4 DIREKT IN DIE CL
        =================================
        */


        simulatedA
            .slice(
                0,
                4
            )
            .forEach(
                entry => {

                    results[
                        entry.manager.id
                    ].championsLeague++;


                    results[
                        entry.manager.id
                    ].directQualification++;

                }
            );


        simulatedB
            .slice(
                0,
                4
            )
            .forEach(
                entry => {

                    results[
                        entry.manager.id
                    ].championsLeague++;


                    results[
                        entry.manager.id
                    ].directQualification++;

                }
            );


        /*
        =================================
        VERGLEICH DER FÜNFTPLATZIERTEN
        =================================

        Der punktbessere Fünfte bekommt
        den neunten CL-Platz.
        */


        const fifthA =
            simulatedA[4];


        const fifthB =
            simulatedB[4];


        let fifthWinner =
            null;


        if (
            fifthA.points >
            fifthB.points
        ) {

            fifthWinner =
                fifthA;

        }

        else if (
            fifthB.points >
            fifthA.points
        ) {

            fifthWinner =
                fifthB;

        }

        else {

            /*
            Falls beide exakt dieselbe
            simulierte Gesamtpunktzahl
            besitzen.

            Solange keine offizielle
            Tie-Break-Regel hinterlegt
            ist, entscheidet die Simulation
            diesen extrem seltenen Fall
            zufällig.
            */

            fifthWinner =
                Math.random() < 0.5
                    ? fifthA
                    : fifthB;

        }


        /*
        Gewinner des Vergleichs erhält
        den CL-Platz.
        */

        results[
            fifthWinner.manager.id
        ].championsLeague++;


        results[
            fifthWinner.manager.id
        ].fifthPlaceQualification++;


        /*
        Gruppenergebnisse speichern.
        */

        processQualificationSimulationResults(
            simulatedA,
            results
        );


        processQualificationSimulationResults(
            simulatedB,
            results
        );

    }


    /*
    =====================================
    ERGEBNISSE IN PROZENT UMWANDELN
    =====================================
    */


    Object.values(
        results
    ).forEach(
        result => {


            /*
            Gesamte CL-Chance.
            */

            result
                .championsLeagueProbability =
                predictionToPercentage(
                    result
                        .championsLeague
                );


            /*
            Direkte CL-Chance über
            Platz 1–4.
            */

            result
                .directQualificationProbability =
                predictionToPercentage(
                    result
                        .directQualification
                );


            /*
            Wahrscheinlichkeit, über
            Platz 5 den neunten
            CL-Platz zu bekommen.
            */

            result
                .fifthPlaceQualificationProbability =
                predictionToPercentage(
                    result
                        .fifthPlaceQualification
                );


            /*
            Kreisliga ist automatisch
            das Gegenstück zur
            Champions-League-Chance.

            Dadurch gilt immer:

            CL + Kreisliga = 100 %
            */

            result
                .kreisligaProbability =
                Number(
                    (
                        100 -
                        result
                            .championsLeagueProbability
                    )
                    .toFixed(1)
                );


            /*
            Chance auf Gruppensieg.
            */

            result
                .firstPlaceProbability =
                predictionToPercentage(
                    result
                        .firstPlace
                );


            /*
            Durchschnittlich erwarteter
            Endplatz.
            */

            result
                .averageFinalPosition =
                Number(
                    (
                        result
                            .totalFinalPosition
                        /
                        predictionConfig
                            .simulations
                    )
                    .toFixed(2)
                );


            /*
            Wahrscheinlichkeit jeder
            einzelnen Platzierung.
            */

            result
                .positionProbabilities =
                {};


            Object.entries(
                result.positionCounts
            ).forEach(
                (
                    [
                        position,
                        count
                    ]
                ) => {

                    result
                        .positionProbabilities[
                            position
                        ] =
                        predictionToPercentage(
                            count
                        );

                }
            );

        }
    );


    return results;

}


/*
=========================================
EINE QUALIGRUPPE SIMULIEREN
=========================================
*/


function simulateQualificationGroup(
    managers
) {

    const simulated =
        managers.map(
            manager => {

                /*
                Bereits erzielte Punkte
                bleiben vollständig bestehen.
                */

                let points =
                    Number(
                        manager
                            .qualification
                            .points
                    ) || 0;


                /*
                Anzahl tatsächlich
                gespielter Spieltage.
                */

                const played =
                    getPredictionPlayedMatchdays(
                        manager,
                        "qualification"
                    );


                /*
                Noch offene Spieltage.
                */

                const remaining =
                    Math.max(
                        0,
                        predictionConfig
                            .qualificationMatchdays
                        -
                        played
                    );


                /*
                Erwartete zukünftige
                Spieltagsleistung.
                */

                const expectedScore =
                    getPredictionExpectedScore(
                        manager,
                        "qualification"
                    );


                /*
                Individuelle Schwankung.
                */

                const deviation =
                    getPredictionDeviation(
                        manager,
                        "qualification"
                    );


                /*
                Alle verbleibenden
                Spieltage simulieren.
                */

                for (
                    let matchday = 0;
                    matchday < remaining;
                    matchday++
                ) {

                    const simulatedScore =
                        randomNormal(
                            expectedScore,
                            deviation
                        );


                    /*
                    Negative Kickbase-Punkte
                    werden für unsere
                    Prognose auf 0 begrenzt.
                    */

                    points +=
                        Math.max(
                            0,
                            Math.round(
                                simulatedScore
                            )
                        );

                }


                return {

                    manager:
                        manager,

                    points:
                        points

                };

            }
        );


    /*
    Simulierte Abschlusstabelle.
    */

    simulated.sort(
        (
            managerA,
            managerB
        ) => {

            if (
                managerB.points !==
                managerA.points
            ) {

                return (
                    managerB.points -
                    managerA.points
                );

            }


            /*
            Bei exakt identischen Punkten
            momentan zufällige Reihenfolge.

            Eine offizielle Tie-Break-Regel
            können wir später ergänzen.
            */

            return (
                Math.random() - 0.5
            );

        }
    );


    return simulated;

}


/*
=========================================
SIMULATIONSERGEBNIS VERARBEITEN
=========================================
*/


function processQualificationSimulationResults(
    simulatedGroup,
    results
) {

    simulatedGroup.forEach(
        (
            entry,
            index
        ) => {

            const position =
                index + 1;


            const result =
                results[
                    entry.manager.id
                ];


            /*
            Platzierung mitzählen.
            */

            result
                .positionCounts[
                    position
                ]++;


            /*
            Für durchschnittlichen
            Endplatz.
            */

            result
                .totalFinalPosition +=
                position;


            /*
            Gruppensieg.
            */

            if (
                position === 1
            ) {

                result.firstPlace++;

            }

        }
    );

}


/*
=========================================
ERWARTETE SPIELTAGSLEISTUNG
=========================================
*/


function getPredictionExpectedScore(
    manager,
    competitionKey
) {

    /*
    Nur tatsächlich gespielte
    Spieltage holen.
    */

    const scores =
        getPredictionRealScores(
            manager,
            competitionKey
        );


    /*
    Durchschnitt der jeweiligen
    Qualifikationsgruppe.
    */

    const leagueAverage =
        getPredictionLeagueAverage(
            manager,
            competitionKey
        );


    /*
    =====================================
    NOCH KEINE ECHTEN DATEN
    =====================================

    Vor Saisonstart haben alle Manager
    dieselbe neutrale Ausgangslage.

    Ein eventuell gesetzter Kaderfaktor
    wird trotzdem berücksichtigt.
    */


    if (
        scores.length === 0
    ) {

        return Math.max(
            0,
            leagueAverage +
            getPredictionAdjustment(
                manager.id
            )
        );

    }


    /*
    =====================================
    SAISONLEISTUNG
    =====================================
    */


    const seasonAverage =
        predictionAverage(
            scores
        );


    /*
    =====================================
    AKTUELLE FORM
    =====================================

    Maximal die letzten fünf Spieltage.
    */


    const recentScores =
        scores.slice(
            -predictionConfig
                .formMatchdays
        );


    const formAverage =
        getWeightedFormAverage(
            recentScores
        );


    /*
    =====================================
    GRUNDLEISTUNG
    =====================================

    70 % Saison
    30 % Form
    */


    const rawStrength =
        (
            seasonAverage *
            predictionConfig
                .seasonWeight
        )
        +
        (
            formAverage *
            predictionConfig
                .formWeight
        );


    /*
    =====================================
    VERTRAUEN IN DIE DATEN
    =====================================

    Nach einem Spieltag wollen wir noch
    keine extremen Prognosen erzeugen.

    Deshalb:

    1 Spieltag = 20 % individuelle Daten
    2 Spieltage = 40 %
    3 Spieltage = 60 %
    4 Spieltage = 80 %
    ab 5       = 100 %
    */


    const confidence =
        Math.min(
            1,
            scores.length /
            predictionConfig
                .fullConfidenceAfter
        );


    /*
    Individuelle Leistung wird mit dem
    Gruppendurchschnitt kombiniert.
    */


    const adjustedStrength =
        (
            rawStrength *
            confidence
        )
        +
        (
            leagueAverage *
            (
                1 -
                confidence
            )
        );


    /*
    =====================================
    KADERFAKTOR
    =====================================

    Der Kaderfaktor verändert ausschließlich
    die erwartete zukünftige Leistung.
    */


    return Math.max(
        0,
        adjustedStrength +
        getPredictionAdjustment(
            manager.id
        )
    );

}


/*
=========================================
FORM GEWICHTEN
=========================================

Neuere Spieltage zählen stärker.

Bei fünf Spieltagen:

ältester Spieltag = Gewicht 1
                    Gewicht 2
                    Gewicht 3
                    Gewicht 4
neuester Spieltag = Gewicht 5

=========================================
*/


function getWeightedFormAverage(
    scores
) {

    if (
        !scores.length
    ) {

        return 0;

    }


    let weightedTotal =
        0;


    let totalWeight =
        0;


    scores.forEach(
        (
            score,
            index
        ) => {

            const weight =
                index + 1;


            weightedTotal +=
                Number(score) *
                weight;


            totalWeight +=
                weight;

        }
    );


    return (
        weightedTotal /
        totalWeight
    );

}


/*
=========================================
INDIVIDUELLE SCHWANKUNG
=========================================
*/


function getPredictionDeviation(
    manager,
    competitionKey
) {

    const scores =
        getPredictionRealScores(
            manager,
            competitionKey
        );


    /*
    Bei weniger als zwei echten
    Spieltagen gibt es noch keine
    sinnvolle individuelle Streuung.
    */


    if (
        scores.length < 2
    ) {

        return predictionConfig
            .minimumDeviation;

    }


    const average =
        predictionAverage(
            scores
        );


    /*
    Varianz berechnen.
    */


    const variance =
        scores.reduce(
            (
                total,
                score
            ) => {

                return (
                    total +
                    Math.pow(
                        Number(score) -
                        average,
                        2
                    )
                );

            },
            0
        )
        /
        scores.length;


    /*
    Standardabweichung.
    */


    const deviation =
        Math.sqrt(
            variance
        );


    /*
    Mindestens 180 Punkte Schwankung.
    */


    return Math.max(
        predictionConfig
            .minimumDeviation,
        deviation
    );

}


/*
=========================================
ECHTE SPIELTAGSPUNKTE
=========================================
*/


function getPredictionRealScores(
    manager,
    competitionKey
) {

    const competitionData =
        manager[
            competitionKey
        ];


    if (
        !competitionData ||
        !Array.isArray(
            competitionData.scores
        )
    ) {

        return [];

    }


    /*
    WICHTIG:

    In league-data.js stehen vor dem
    Saisonstart teilweise 0-Werte.

    Diese bedeuten:

    "Spieltag noch nicht gespielt"

    und dürfen deshalb NICHT als echte
    Kickbase-Leistung gewertet werden.
    */


    return competitionData
        .scores
        .map(
            score =>
                Number(score)
        )
        .filter(
            score =>
                Number.isFinite(
                    score
                )
                &&
                score > 0
        );

}


/*
=========================================
GESPIELTE SPIELTAGE
=========================================
*/


function getPredictionPlayedMatchdays(
    manager,
    competitionKey
) {

    return getPredictionRealScores(
        manager,
        competitionKey
    ).length;

}


/*
=========================================
GRUPPEN-/LIGADURCHSCHNITT
=========================================
*/


function getPredictionLeagueAverage(
    manager,
    competitionKey
) {

    let managers =
        [];


    /*
    Während der Qualifikation wird
    ausschließlich mit Managern aus
    derselben Gruppe verglichen.
    */


    if (
        competitionKey ===
        "qualification"
    ) {

        managers =
            getPredictionQualificationManagers(
                manager
                    .qualification
                    .group
            );

    }

    else {

        /*
        Vorbereitung für die spätere
        Champions-League- und
        Kreisliga-Prognose.
        */

        managers =
            leagueData.managers.filter(
                item =>
                    item
                        .mainRound
                        .league ===
                    manager
                        .mainRound
                        .league
            );

    }


    const allScores =
        [];


    managers.forEach(
        leagueManager => {

            allScores.push(
                ...getPredictionRealScores(
                    leagueManager,
                    competitionKey
                )
            );

        }
    );


    /*
    =====================================
    VOR SAISONSTART
    =====================================

    Noch keine echten Daten vorhanden.

    1.750 dient als neutraler Startwert.

    Da ALLE Manager denselben Startwert
    bekommen, verschafft er niemandem
    einen künstlichen Vorteil.
    */


    if (
        allScores.length === 0
    ) {

        return 1750;

    }


    return predictionAverage(
        allScores
    );

}


/*
=========================================
KADERFAKTOR
=========================================
*/


function getPredictionAdjustment(
    managerId
) {

    const adjustmentData =
        predictionAdjustments[
            managerId
        ];


    if (
        !adjustmentData
    ) {

        return 0;

    }


    const adjustment =
        Number(
            adjustmentData
                .adjustment
        );


    if (
        !Number.isFinite(
            adjustment
        )
    ) {

        return 0;

    }


    return adjustment;

}


/*
=========================================
GRUND FÜR KADERFAKTOR
=========================================
*/


function getPredictionAdjustmentReason(
    managerId
) {

    const adjustmentData =
        predictionAdjustments[
            managerId
        ];


    if (
        !adjustmentData ||
        !adjustmentData.reason
    ) {

        return "";

    }


    return String(
        adjustmentData.reason
    );

}


/*
=========================================
QUALIFIKATIONSMANAGER HOLEN
=========================================
*/


function getPredictionQualificationManagers(
    groupName
) {

    return leagueData.managers.filter(
        manager =>
            manager
                .qualification
                .group ===
            groupName
    );

}


/*
=========================================
DURCHSCHNITT BERECHNEN
=========================================
*/


function predictionAverage(
    values
) {

    if (
        !values.length
    ) {

        return 0;

    }


    return (
        values.reduce(
            (
                total,
                value
            ) => {

                return (
                    total +
                    Number(value)
                );

            },
            0
        )
        /
        values.length
    );

}


/*
=========================================
NORMALVERTEILTE ZUFALLSZAHL
BOX-MULLER-VERFAHREN
=========================================

Damit entstehen realistische
Schwankungen um die erwartete
Spieltagsleistung.

=========================================
*/


function randomNormal(
    mean,
    standardDeviation
) {

    let u1 =
        Math.random();


    const u2 =
        Math.random();


    /*
    log(0) verhindern.
    */


    if (
        u1 === 0
    ) {

        u1 =
            Number.MIN_VALUE;

    }


    const normal =
        Math.sqrt(
            -2 *
            Math.log(
                u1
            )
        )
        *
        Math.cos(
            2 *
            Math.PI *
            u2
        );


    return (
        mean +
        normal *
        standardDeviation
    );

}


/*
=========================================
ANZAHL -> PROZENT
=========================================
*/


function predictionToPercentage(
    count
) {

    return Number(
        (
            (
                count /
                predictionConfig
                    .simulations
            )
            *
            100
        )
        .toFixed(1)
    );

}


/*
=========================================
PROGNOSE SORTIERT AUSGEBEN
=========================================

Diese Funktion brauchen wir später
auch für unsere Darstellung auf
der Website.

=========================================
*/


function getQualificationPredictionRanking(
    groupName
) {

    const prediction =
        calculateQualificationPrediction();


    if (!prediction) {

        return [];

    }


    return Object.values(
        prediction
    )
        .filter(
            result =>
                result.group ===
                groupName
        )
        .sort(
            (
                managerA,
                managerB
            ) => {

                /*
                Zuerst höhere CL-Chance.
                */

                if (
                    managerB
                        .championsLeagueProbability
                    !==
                    managerA
                        .championsLeagueProbability
                ) {

                    return (
                        managerB
                            .championsLeagueProbability
                        -
                        managerA
                            .championsLeagueProbability
                    );

                }


                /*
                Danach besserer erwarteter
                Endplatz.
                */

                return (
                    managerA
                        .averageFinalPosition
                    -
                    managerB
                        .averageFinalPosition
                );

            }
        );

}

/*
=========================================
POWER RATING
=========================================

Das Power Rating misst die aktuelle
sportliche Stärke eines Managers.

GEWICHTUNG:

40 % Saisonleistung
25 % aktuelle Form
20 % Ultimate OVR / Karriere
10 % relative Tabellenleistung
 5 % Konstanz + Spieltagssiege

Das Power Rating liegt zwischen 0 und 100.

WICHTIG:

Die absoluten Kickbase-Punkte aus der
Qualifikation werden NICHT einfach auf
die Hauptphase übertragen.

Die Berechnung bewertet insbesondere
die RELATIVE Leistung zum jeweiligen
Konkurrenzfeld.

Dadurch ist es kein Problem, wenn ein
fertiger Quali-Kader deutlich mehr Punkte
erzielt als ein frisch gedrafteter
Champions-League-Kader.

=========================================
*/


const powerRatingConfig = {

    seasonPerformanceWeight: 0.40,

    formWeight: 0.25,

    ultimateWeight: 0.20,

    tableWeight: 0.10,

    consistencyWeight: 0.05,


    /*
    Ein Power Rating von ungefähr 50
    entspricht einer neutralen /
    durchschnittlichen Ausgangslage.
    */

    neutralRating: 50,


    /*
    Gruppenstärke wirkt nur sehr leicht.

    Sie soll niemals wichtiger werden
    als die Leistung des Managers selbst.
    */

    maximumGroupStrengthModifier: 4

};


/*
=========================================
POWER RATING BERECHNEN
=========================================
*/


function calculateManagerPowerRating(
    manager,
    competitionKey = null
) {

    if (!manager) {

        return null;

    }


    /*
    Automatisch entscheiden, welche
    Phase gerade bewertet werden soll.
    */

    if (!competitionKey) {

        competitionKey =
            manager.mainRound &&
            manager.mainRound.league
                ? "mainRound"
                : "qualification";

    }


    /*
    =====================================
    1. SAISONLEISTUNG – 40 %
    =====================================
    */

    const seasonPerformance =
        getPowerSeasonPerformance(
            manager,
            competitionKey
        );


    /*
    =====================================
    2. FORM – 25 %
    =====================================
    */

    const form =
        getPowerFormScore(
            manager,
            competitionKey
        );


    /*
    =====================================
    3. ULTIMATE OVR – 20 %
    =====================================
    */

    const ultimate =
        getPowerUltimateScore(
            manager
        );


    /*
    =====================================
    4. TABELLENLEISTUNG – 10 %
    =====================================
    */

    const table =
        getPowerTableScore(
            manager,
            competitionKey
        );


    /*
    =====================================
    5. KONSTANZ + TAGESSIEGE – 5 %
    =====================================
    */

    const consistency =
        getPowerConsistencyScore(
            manager,
            competitionKey
        );


    /*
    =====================================
    POWER RATING
    =====================================
    */


    let powerRating =
        (
            seasonPerformance *
            powerRatingConfig
                .seasonPerformanceWeight
        )
        +
        (
            form *
            powerRatingConfig
                .formWeight
        )
        +
        (
            ultimate *
            powerRatingConfig
                .ultimateWeight
        )
        +
        (
            table *
            powerRatingConfig
                .tableWeight
        )
        +
        (
            consistency *
            powerRatingConfig
                .consistencyWeight
        );


    powerRating =
        clampPowerRating(
            powerRating
        );


    return {

        rating:
            Number(
                powerRating.toFixed(1)
            ),


        factors: {

            seasonPerformance:
                Number(
                    seasonPerformance
                        .toFixed(1)
                ),

            form:
                Number(
                    form.toFixed(1)
                ),

            ultimate:
                Number(
                    ultimate.toFixed(1)
                ),

            table:
                Number(
                    table.toFixed(1)
                ),

            consistency:
                Number(
                    consistency.toFixed(1)
                )

        },


        qualificationGroupStrength:
            Number(
                getQualificationGroupStrengthIndex(
                    manager
                ).toFixed(1)
            )

    };

}


/*
=========================================
1. SAISONLEISTUNG
=========================================

Wir vergleichen einen Manager
mit seinem jeweiligen Konkurrenzfeld.

Beispiel:

Manager Ø = 1.200
Liga Ø    = 1.000

→ deutlich überdurchschnittlich.

Dadurch spielt es keine Rolle, ob
die komplette Liga im Laufe der Saison
mehr Punkte erzielt.

=========================================
*/


function getPowerSeasonPerformance(
    manager,
    competitionKey
) {

    /*
    =====================================
    QUALIFIKATION
    =====================================
    */

    if (
        competitionKey ===
        "qualification"
    ) {

        const relativeScore =
            getRelativePerformanceScore(
                manager,
                "qualification"
            );


        /*
        Kleine Korrektur anhand der
        Stärke der Qualifikationsgruppe.
        */

        const groupModifier =
            getQualificationGroupStrengthModifier(
                manager
            );


        return clampPowerRating(
            relativeScore +
            groupModifier
        );

    }


    /*
    =====================================
    HAUPTRUNDE
    =====================================

    Die Qualifikation bleibt als
    Leistungsnachweis erhalten.

    Sie verliert aber zunehmend an Gewicht,
    sobald echte CL-/Kreisliga-Daten
    vorhanden sind.
    */


    const qualificationScore =
        getRelativePerformanceScore(
            manager,
            "qualification"
        )
        +
        getQualificationGroupStrengthModifier(
            manager
        );


    const mainRoundScores =
        getPredictionRealScores(
            manager,
            "mainRound"
        );


    /*
    Noch kein CL-/Kreisliga-Spieltag.

    Die Qualifikation ist unsere einzige
    sportliche Datenbasis.

    WICHTIG:
    Wir übernehmen NICHT den Punkteschnitt,
    sondern nur die relative Managerstärke.
    */

    if (
        mainRoundScores.length === 0
    ) {

        return clampPowerRating(
            qualificationScore
        );

    }


    const mainRoundScore =
        getRelativePerformanceScore(
            manager,
            "mainRound"
        );


    /*
    Qualifikation verliert mit jedem
    Hauptphasen-Spieltag an Bedeutung.

    0 ST  -> 100 % Quali
    1 ST  -> 85 %
    3 ST  -> 60 %
    5 ST  -> 40 %
    8 ST  -> 20 %
    10+   -> 10 %

    Zwischenwerte werden automatisch
    interpoliert.
    */


    const qualificationWeight =
        getQualificationHistoryWeight(
            mainRoundScores.length
        );


    const mainRoundWeight =
        1 -
        qualificationWeight;


    return clampPowerRating(

        (
            qualificationScore *
            qualificationWeight
        )
        +
        (
            mainRoundScore *
            mainRoundWeight
        )

    );

}


/*
=========================================
QUALI-HISTORIE GEWICHTEN
=========================================
*/


function getQualificationHistoryWeight(
    playedMainRoundMatchdays
) {

    const weightTable = [

        {
            matchday: 0,
            weight: 1.00
        },

        {
            matchday: 1,
            weight: 0.85
        },

        {
            matchday: 3,
            weight: 0.60
        },

        {
            matchday: 5,
            weight: 0.40
        },

        {
            matchday: 8,
            weight: 0.20
        },

        {
            matchday: 10,
            weight: 0.10
        }

    ];


    if (
        playedMainRoundMatchdays <= 0
    ) {

        return 1;

    }


    if (
        playedMainRoundMatchdays >= 10
    ) {

        return 0.10;

    }


    for (
        let index = 0;
        index <
            weightTable.length - 1;
        index++
    ) {

        const current =
            weightTable[index];


        const next =
            weightTable[
                index + 1
            ];


        if (
            playedMainRoundMatchdays >=
                current.matchday
            &&
            playedMainRoundMatchdays <=
                next.matchday
        ) {

            const distance =
                next.matchday -
                current.matchday;


            const progress =
                (
                    playedMainRoundMatchdays -
                    current.matchday
                )
                /
                distance;


            return (
                current.weight
                +
                (
                    next.weight -
                    current.weight
                )
                *
                progress
            );

        }

    }


    return 0.10;

}


/*
=========================================
RELATIVE SAISONLEISTUNG
=========================================

Durchschnitt der Managerleistung
im Verhältnis zum Konkurrenzfeld.

Ligadurchschnitt = Power 50.

+50 % besser als Liga = Power 100.

-50 % schlechter = Power 0.

=========================================
*/


function getRelativePerformanceScore(
    manager,
    competitionKey
) {

    const scores =
        getPredictionRealScores(
            manager,
            competitionKey
        );


    /*
    Keine Daten = neutral.
    */

    if (
        scores.length === 0
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const managerAverage =
        predictionAverage(
            scores
        );


    const competitors =
        getPowerCompetitors(
            manager,
            competitionKey
        );


    const competitorScores =
        [];


    competitors.forEach(
        competitor => {

            competitorScores.push(
                ...getPredictionRealScores(
                    competitor,
                    competitionKey
                )
            );

        }
    );


    if (
        competitorScores.length === 0
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const competitionAverage =
        predictionAverage(
            competitorScores
        );


    if (
        competitionAverage <= 0
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const relativeDifference =
        (
            managerAverage /
            competitionAverage
        )
        -
        1;


    /*
    Beispiele:

    Liga Ø 1.000
    Manager 1.000
    → 50

    Manager 1.200
    → 70

    Manager 1.500
    → 100

    Manager 800
    → 30
    */


    const score =
        50 +
        (
            relativeDifference *
            100
        );


    return clampPowerRating(
        score
    );

}


/*
=========================================
2. AKTUELLE FORM
=========================================

Maximal die letzten 5 Spieltage.

Neuere Spieltage zählen stärker.

Die Form wird ebenfalls relativ
zum Konkurrenzfeld bewertet.

=========================================
*/


function getPowerFormScore(
    manager,
    competitionKey
) {

    let key =
        competitionKey;


    /*
    Hauptphase hat noch nicht begonnen:

    Dann verwenden wir die letzten
    Quali-Spieltage als aktuelle Form.
    */

    if (
        competitionKey ===
            "mainRound"
        &&
        getPredictionRealScores(
            manager,
            "mainRound"
        ).length === 0
    ) {

        key =
            "qualification";

    }


    const scores =
        getPredictionRealScores(
            manager,
            key
        );


    if (
        scores.length === 0
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const recentScores =
        scores.slice(
            -5
        );


    const managerFormAverage =
        getWeightedFormAverage(
            recentScores
        );


    const competitors =
        getPowerCompetitors(
            manager,
            key
        );


    const competitorFormValues =
        [];


    competitors.forEach(
        competitor => {

            const competitorScores =
                getPredictionRealScores(
                    competitor,
                    key
                )
                .slice(
                    -5
                );


            if (
                competitorScores.length
            ) {

                competitorFormValues.push(
                    getWeightedFormAverage(
                        competitorScores
                    )
                );

            }

        }
    );


    if (
        competitorFormValues.length === 0
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const competitionFormAverage =
        predictionAverage(
            competitorFormValues
        );


    if (
        competitionFormAverage <= 0
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const relativeDifference =
        (
            managerFormAverage /
            competitionFormAverage
        )
        -
        1;


    return clampPowerRating(

        50 +
        (
            relativeDifference *
            100
        )

    );

}


/*
=========================================
3. ULTIMATE OVR / KARRIERE
=========================================

WICHTIG:

Das OVR wird NICHT in Kickbase-Punkte
umgerechnet.

Außerdem starten die OVR-Werte zunächst
eng beieinander.

Deshalb vergleichen wir nur, wie stark
das OVR eines Managers vom Durchschnitt
aller Manager abweicht.

Kleine OVR-Unterschiede erzeugen dadurch
auch nur kleine Power-Unterschiede.

=========================================
*/


function getPowerUltimateScore(
    manager
) {

    const allRatings =
        leagueData.managers.map(
            item =>
                getPredictionUltimateRating(
                    item
                )
        );


    const managerRating =
        getPredictionUltimateRating(
            manager
        );


    const averageRating =
        predictionAverage(
            allRatings
        );


    /*
    OVR 1 Punkt über Liga-Ø
    = +4 Punkte in diesem Teilwert.

    Der Karrierewert wird bewusst
    auf 30–70 begrenzt.
    */


    const score =
        50 +
        (
            managerRating -
            averageRating
        )
        *
        4;


    return Math.min(
        70,
        Math.max(
            30,
            score
        )
    );

}


/*
=========================================
ULTIMATE OVR HOLEN
=========================================

Entspricht der Logik aus
manager-profil.js.

Falls legenden.js auf einer Seite
nicht geladen ist, wird neutral 60
verwendet.

=========================================
*/


function getPredictionUltimateRating(
    manager
) {

    if (
        typeof calculateLegendPoints !==
            "function"
        ||
        typeof createLegendRanking !==
            "function"
    ) {

        return 60;

    }


    const legendPoints =
        calculateLegendPoints(
            manager
        );


    const ranking =
        createLegendRanking();


    const rankingPosition =
        ranking.findIndex(
            item =>
                item.id === manager.id
        )
        +
        1;


    let rating =
        60 +
        Math.floor(
            legendPoints /
            12
        );


    if (
        rankingPosition === 1
    ) {

        rating += 3;

    }

    else if (
        rankingPosition <= 3
    ) {

        rating += 2;

    }

    else if (
        rankingPosition <= 6
    ) {

        rating += 1;

    }


    return Math.min(
        99,
        Math.max(
            60,
            rating
        )
    );

}


/*
=========================================
4. TABELLENLEISTUNG
=========================================

Platz 1 = 100
Platz 5 = 50
Platz 9 = 0

=========================================
*/


function getPowerTableScore(
    manager,
    competitionKey
) {

    let position =
        null;


    if (
        competitionKey ===
        "mainRound"
    ) {

        position =
            manager
                .mainRound
                .currentPosition;


        /*
        Hauptphase noch nicht begonnen:
        Quali-Platz verwenden.
        */

        if (!position) {

            position =
                manager
                    .qualification
                    .currentPosition;

        }

    }

    else {

        position =
            manager
                .qualification
                .currentPosition;

    }


    if (!position) {

        return powerRatingConfig
            .neutralRating;

    }


    return clampPowerRating(

        100 -
        (
            (
                position -
                1
            )
            *
            12.5
        )

    );

}


/*
=========================================
5. KONSTANZ + SPIELTAGSSIEGE
=========================================

70 % Konstanz
30 % Spieltagssiege

=========================================
*/


function getPowerConsistencyScore(
    manager,
    competitionKey
) {

    let key =
        competitionKey;


    if (
        competitionKey ===
            "mainRound"
        &&
        getPredictionRealScores(
            manager,
            "mainRound"
        ).length === 0
    ) {

        key =
            "qualification";

    }


    const scores =
        getPredictionRealScores(
            manager,
            key
        );


    /*
    Noch keine Daten.
    */

    if (
        scores.length < 2
    ) {

        return powerRatingConfig
            .neutralRating;

    }


    const average =
        predictionAverage(
            scores
        );


    const variance =
        scores.reduce(
            (
                total,
                score
            ) => {

                return (
                    total +
                    Math.pow(
                        score -
                        average,
                        2
                    )
                );

            },
            0
        )
        /
        scores.length;


    const deviation =
        Math.sqrt(
            variance
        );


    /*
    Variationskoeffizient.

    Beispiel:

    Ø 1.000
    Schwankung 200
    = 20 %
    */


    const coefficientOfVariation =
        average > 0
            ?
            deviation /
            average
            :
            0;


    /*
    10 % Schwankung -> 80
    25 % Schwankung -> 50
    40 % Schwankung -> 20
    */


    const consistencyScore =
        clampPowerRating(

            100 -
            (
                coefficientOfVariation *
                200
            )

        );


    /*
    =====================================
    TAGESSIEGE
    =====================================
    */


    const competitors =
        getPowerCompetitors(
            manager,
            key
        );


    const managerWins =
        key === "mainRound"
            ?
            (
                manager
                    .mainRound
                    .matchdayWins ||
                0
            )
            :
            (
                manager
                    .qualification
                    .matchdayWins ||
                0
            );


    const competitorWins =
        competitors.map(
            competitor =>
                key === "mainRound"
                    ?
                    (
                        competitor
                            .mainRound
                            .matchdayWins ||
                        0
                    )
                    :
                    (
                        competitor
                            .qualification
                            .matchdayWins ||
                        0
                    )
        );


    const maximumWins =
        Math.max(
            0,
            ...competitorWins
        );


    /*
    Noch niemand hat einen Tagessieg:
    neutral.
    */


    const winScore =
        maximumWins > 0
            ?
            (
                managerWins /
                maximumWins
            )
            *
            100
            :
            50;


    return clampPowerRating(

        (
            consistencyScore *
            0.70
        )
        +
        (
            winScore *
            0.30
        )

    );

}


/*
=========================================
KONKURRENTEN HOLEN
=========================================
*/


function getPowerCompetitors(
    manager,
    competitionKey
) {

    if (
        competitionKey ===
        "qualification"
    ) {

        return leagueData.managers.filter(
            item =>
                item
                    .qualification
                    .group ===
                manager
                    .qualification
                    .group
        );

    }


    if (
        manager.mainRound &&
        manager.mainRound.league
    ) {

        return leagueData.managers.filter(
            item =>
                item
                    .mainRound
                    .league ===
                manager
                    .mainRound
                    .league
        );

    }


    /*
    Hauptphase noch nicht zugewiesen:
    Qualigruppe als Fallback.
    */

    return leagueData.managers.filter(
        item =>
            item
                .qualification
                .group ===
            manager
                .qualification
                .group
    );

}


/*
=========================================
QUALIFIKATIONSGRUPPEN-STÄRKE
=========================================

Die Stärke wird NICHT anhand der
Kickbase-Punkte bestimmt.

Stattdessen nutzen wir ausschließlich
die Karriere-/Ultimate-Einschätzung
der enthaltenen Manager.

Damit kann später z. B. eine Gruppe
mit vielen historisch starken Managern
leicht aufgewertet werden.

Der Effekt bleibt bewusst klein.

=========================================
*/


function getQualificationGroupStrengthIndex(
    manager
) {

    const group =
        manager &&
        manager.qualification
            ?
            manager
                .qualification
                .group
            :
            null;


    if (!group) {

        return 50;

    }


    const groupManagers =
        leagueData.managers.filter(
            item =>
                item
                    .qualification
                    .group ===
                group
        );


    if (
        groupManagers.length === 0
    ) {

        return 50;

    }


    const allUltimateScores =
        leagueData.managers.map(
            item =>
                getPowerUltimateScore(
                    item
                )
        );


    const groupUltimateScores =
        groupManagers.map(
            item =>
                getPowerUltimateScore(
                    item
                )
        );


    const overallAverage =
        predictionAverage(
            allUltimateScores
        );


    const groupAverage =
        predictionAverage(
            groupUltimateScores
        );


    /*
    50 = durchschnittlich starke Gruppe.
    */


    return clampPowerRating(

        50 +
        (
            groupAverage -
            overallAverage
        )

    );

}


/*
=========================================
GRUPPENSTÄRKE ALS KLEINER BONUS
=========================================
*/


function getQualificationGroupStrengthModifier(
    manager
) {

    const groupStrength =
        getQualificationGroupStrengthIndex(
            manager
        );


    /*
    Gruppenindex 50 = kein Effekt.

    Der Einfluss wird halbiert und
    anschließend auf maximal +/-4
    Power-Punkte begrenzt.
    */


    const modifier =
        (
            groupStrength -
            50
        )
        *
        0.5;


    return Math.max(

        -powerRatingConfig
            .maximumGroupStrengthModifier,

        Math.min(

            powerRatingConfig
                .maximumGroupStrengthModifier,

            modifier

        )

    );

}


/*
=========================================
POWER RATING BEGRENZEN
=========================================
*/


function clampPowerRating(
    value
) {

    return Math.min(
        100,
        Math.max(
            0,
            Number(value) || 0
        )
    );

}


/*
=========================================
POWER RANKING
=========================================
*/


function createPowerRanking(
    competitionKey = null
) {

    return leagueData.managers
        .map(
            manager => {

                const power =
                    calculateManagerPowerRating(
                        manager,
                        competitionKey
                    );


                return {

                    id:
                        manager.id,

                    name:
                        manager.name,

                    rating:
                        power
                            ? power.rating
                            : 50,

                    factors:
                        power
                            ? power.factors
                            : null

                };

            }
        )
        .sort(
            (
                managerA,
                managerB
            ) =>
                managerB.rating -
                managerA.rating
        );

}


/*
=========================================
GLOBAL BEREITSTELLEN
=========================================
*/


window.calculateManagerPowerRating =
    calculateManagerPowerRating;


window.createPowerRanking =
    createPowerRanking;


window.powerRatingConfig =
    powerRatingConfig;
/*
=========================================
FUNKTIONEN GLOBAL BEREITSTELLEN
=========================================
*/


window.calculateQualificationPrediction =
    calculateQualificationPrediction;


window.getQualificationPredictionRanking =
    getQualificationPredictionRanking;


window.predictionAdjustments =
    predictionAdjustments;


window.predictionConfig =
    predictionConfig;
    
    /*
=========================================
PROGNOSE AUF DER WEBSITE ANZEIGEN
=========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderQualificationPrediction();

    }
);


/*
=========================================
BEIDE GRUPPEN RENDERN
=========================================
*/


function renderQualificationPrediction() {

    const groupAElement =
        document.getElementById(
            "qualification-prediction-a"
        );


    const groupBElement =
        document.getElementById(
            "qualification-prediction-b"
        );


    /*
    Wenn wir uns nicht auf der
    Qualifikationsseite befinden,
    passiert nichts.
    */

    if (
        !groupAElement ||
        !groupBElement
    ) {

        return;

    }


    /*
    WICHTIG:

    Die Simulation wird nur EINMAL
    ausgeführt.

    Danach verwenden beide Gruppen
    dasselbe Ergebnis.
    */

    const prediction =
        calculateQualificationPrediction();


    if (!prediction) {

        groupAElement.innerHTML =
            createPredictionError();


        groupBElement.innerHTML =
            createPredictionError();


        return;

    }


    const groupA =
        getPredictionRankingFromResults(
            prediction,
            "A"
        );


    const groupB =
        getPredictionRankingFromResults(
            prediction,
            "B"
        );


    groupAElement.innerHTML =
        createPredictionGroupHTML(
            groupA
        );


    groupBElement.innerHTML =
        createPredictionGroupHTML(
            groupB
        );


    /*
    Lucide-Icons neu erzeugen.
    */

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}


/*
=========================================
ERGEBNIS SORTIEREN
=========================================
*/


function getPredictionRankingFromResults(
    prediction,
    groupName
) {

    return Object.values(
        prediction
    )
        .filter(
            result =>
                result.group ===
                groupName
        )
        .sort(
            (
                managerA,
                managerB
            ) => {

                /*
                Höhere CL-Chance zuerst.
                */

                if (
                    managerB
                        .championsLeagueProbability
                    !==
                    managerA
                        .championsLeagueProbability
                ) {

                    return (
                        managerB
                            .championsLeagueProbability
                        -
                        managerA
                            .championsLeagueProbability
                    );

                }


                /*
                Bei gleicher CL-Chance:
                besserer erwarteter
                Endplatz zuerst.
                */

                return (
                    managerA
                        .averageFinalPosition
                    -
                    managerB
                        .averageFinalPosition
                );

            }
        );

}


/*
=========================================
GRUPPE ALS HTML ERZEUGEN
=========================================
*/


function createPredictionGroupHTML(
    managers
) {

    if (
        !Array.isArray(managers) ||
        managers.length === 0
    ) {

        return createPredictionError();

    }


    return managers
        .map(
            (
                manager,
                index
            ) => {

                return createPredictionManagerHTML(
                    manager,
                    index + 1
                );

            }
        )
        .join("");

}


/*
=========================================
EINEN MANAGER DARSTELLEN
=========================================
*/


function createPredictionManagerHTML(
    manager,
    rankingPosition
) {

    const probability =
        Number(
            manager
                .championsLeagueProbability
        ) || 0;


    const directProbability =
        Number(
            manager
                .directQualificationProbability
        ) || 0;


    const fifthProbability =
        Number(
            manager
                .fifthPlaceQualificationProbability
        ) || 0;


    const kreisligaProbability =
        Number(
            manager
                .kreisligaProbability
        ) || 0;


    const averagePosition =
        Number(
            manager
                .averageFinalPosition
        ) || 0;


    const expectedScore =
        Math.round(
            Number(
                manager.expectedScore
            ) || 0
        );


    const adjustment =
        Number(
            manager.adjustment
        ) || 0;


    const adjustmentReason =
        manager.adjustmentReason || "";


    /*
    Balken niemals kleiner als 0
    oder größer als 100.
    */

    const barWidth =
        Math.min(
            100,
            Math.max(
                0,
                probability
            )
        );


    return `
        <article class="qualification-prediction-manager">

            <div class="qualification-prediction-manager-top">

                <div class="qualification-prediction-manager-identity">

                    <span class="qualification-prediction-rank">
                        ${rankingPosition}
                    </span>


                    <div>

                        <a
                            href="/kickbase-league/manager-profil.html?id=${encodeURIComponent(
                                manager.managerId
                            )}"
                            class="qualification-prediction-manager-name"
                        >
                            ${escapePredictionHTML(
                                manager.name
                            )}
                        </a>

                        <span class="qualification-prediction-average">

                            Ø Platz
                            ${formatPredictionDecimal(
                                averagePosition
                            )}

                        </span>

                    </div>

                </div>


                <div class="qualification-prediction-probability">

                    <strong>
                        ${formatPredictionPercentage(
                            probability
                        )}
                    </strong>

                    <span>
                        CL-Chance
                    </span>

                </div>

            </div>


            <div class="qualification-prediction-bar">

                <span
                    style="width: ${barWidth}%"
                ></span>

            </div>


            <div class="qualification-prediction-details">

                <span>

                    <strong>
                        ${formatPredictionPercentage(
                            directProbability
                        )}
                    </strong>

                    direkt

                </span>


                <span>

                    <strong>
                        ${formatPredictionPercentage(
                            fifthProbability
                        )}
                    </strong>

                    über Platz 5

                </span>


                <span>

                    <strong>
                        ${formatPredictionPercentage(
                            kreisligaProbability
                        )}
                    </strong>

                    Kreisliga

                </span>


                <span>

                    <strong>
                        ${formatPredictionNumber(
                            expectedScore
                        )}
                    </strong>

                    Pkt./ST

                </span>

            </div>


            ${
                adjustment !== 0
                    ? `
                        <div class="qualification-prediction-adjustment">

                            <i data-lucide="triangle-alert"></i>

                            <span>

                                Kaderfaktor:

                                <strong>
                                    ${
                                        adjustment > 0
                                            ? "+"
                                            : ""
                                    }${formatPredictionNumber(
                                        adjustment
                                    )}
                                    Pkt./ST
                                </strong>

                                ${
                                    adjustmentReason
                                        ? ` · ${escapePredictionHTML(
                                            adjustmentReason
                                        )}`
                                        : ""
                                }

                            </span>

                        </div>
                    `
                    : ""
            }

        </article>
    `;

}


/*
=========================================
FEHLERMELDUNG
=========================================
*/


function createPredictionError() {

    return `
        <div class="qualification-prediction-loading">

            Prognose konnte nicht
            berechnet werden.

        </div>
    `;

}


/*
=========================================
PROZENT FORMATIEREN
=========================================
*/


function formatPredictionPercentage(
    value
) {

    return (
        Number(value)
            .toLocaleString(
                "de-DE",
                {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }
            )
        +
        " %"
    );

}


/*
=========================================
DEZIMALZAHL FORMATIEREN
=========================================
*/


function formatPredictionDecimal(
    value
) {

    return Number(value)
        .toLocaleString(
            "de-DE",
            {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2
            }
        );

}


/*
=========================================
GANZE ZAHL FORMATIEREN
=========================================
*/


function formatPredictionNumber(
    value
) {

    return new Intl.NumberFormat(
        "de-DE"
    ).format(
        Number(value) || 0
    );

}


/*
=========================================
HTML ABSICHERN
=========================================
*/


function escapePredictionHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}