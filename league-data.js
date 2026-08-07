/*
=========================================
KICKBASE LEAGUE – ZENTRALE DATENBANK
Saison 2026/27
=========================================

ZIEL:

Du pflegst später grundsätzlich nur noch
die Kickbase-Punkte jedes Spieltags.

Beispiel:

qualificationScores: [
    1542,
    1389,
    1664
]

Die Website berechnet daraus automatisch:

- Gesamtpunkte
- Spieltagssiege
- Tabellenplatz
- Legendenpunkte
- Manager-Rang
- Legendenrangliste
- Managerprofile
- Ultimate-Karten
- Auszeichnungen

=========================================
*/


const leagueData = {

    /*
    =====================================
    SAISON
    =====================================
    */

    season: "2026/27",

    phase: "qualification",

    /*
    Mögliche Phasen:

    "qualification"
    "main-round"
    "finished"
    */


    /*
    =====================================
    MANAGER
    =====================================
    */

    managers: [

        createManager(
            "ben",
            "Ben"
        ),

        createManager(
            "bruno",
            "Bruno"
        ),

        createManager(
            "enrico",
            "Enrico"
        ),

        createManager(
            "fabio",
            "Fabio"
        ),

        createManager(
            "heiko",
            "Heiko"
        ),

        createManager(
            "janis",
            "Janis"
        ),

        createManager(
            "malik",
            "Malik"
        ),

        createManager(
            "marco",
            "Marco"
        ),

        createManager(
            "marcel",
            "Marcel"
        ),

        createManager(
            "messe",
            "Messe"
        ),

        createManager(
            "nikolaj",
            "Nikolaj"
        ),

        createManager(
            "nils",
            "Nils"
        ),

        createManager(
            "philipp",
            "Philipp"
        ),

        createManager(
            "reichi",
            "Reichi"
        ),

        createManager(
            "sauer",
            "Sauer"
        ),

        createManager(
            "schwartzer",
            "Schwartzer"
        ),

        createManager(
            "tim",
            "Tim"
        ),

        createManager(
            "tobsen",
            "Tobsen"
        )

    ],


    /*
    =====================================
    QUALIFIKATIONSGRUPPEN
    =====================================

    Die tatsächliche Einteilung tragen
    wir im nächsten Schritt ein.

    Jeweils 9 Manager.
    */

    qualificationGroups: {

    A: [
        "tim",
        "tobsen",
        "enrico",
        "bruno",
        "nils",
        "sauer",
        "marcel",
        "reichi",
        "messe"
    ],

    B: [
        "schwartzer",
        "janis",
        "heiko",
        "marco",
        "malik",
        "nikolaj",
        "ben",
        "philipp",
        "fabio"
    ]

},


    /*
    =====================================
    HAUPTRUNDE
    =====================================

    Wird nach der Qualifikation automatisch
    bzw. später einmalig aus der Einteilung
    befüllt.

    9 Manager Champions League
    9 Manager Kreisliga.
    */

    leagues: {

        championsLeague: [
        ],

        kreisliga: [
        ]

    },


    /*
    =====================================
    POKAL
    =====================================

    Der Baum steht bereits fest.

    Die Spieltagszuordnung ergänzen wir
    später, damit auch Pokalergebnisse
    automatisch aus den Punkten entstehen.
    */

    cup: {

        preliminaryRound: [

            {
                id: "VR1",

                home:
                    "ben",

                away:
                    "enrico",

                matchday:
                    null
            },

            {
                id: "VR2",

                home:
                    "tim",

                away:
                    "philipp",

                matchday:
                    null
            }

        ],


        roundOf16: [

            {
                id: "AF1",

                home:
                    "winner-VR1",

                away:
                    "nils",

                matchday:
                    null
            },

            {
                id: "AF2",

                home:
                    "reichi",

                away:
                    "messe",

                matchday:
                    null
            },

            {
                id: "AF3",

                home:
                    "marcel",

                away:
                    "fabio",

                matchday:
                    null
            },

            {
                id: "AF4",

                home:
                    "sauer",

                away:
                    "marco",

                matchday:
                    null
            },

            {
                id: "AF5",

                home:
                    "malik",

                away:
                    "janis",

                matchday:
                    null
            },

            {
                id: "AF6",

                home:
                    "heiko",

                away:
                    "schwartzer",

                matchday:
                    null
            },

            {
                id: "AF7",

                home:
                    "tobsen",

                away:
                    "nikolaj",

                matchday:
                    null
            },

            {
                id: "AF8",

                home:
                    "bruno",

                away:
                    "winner-VR2",

                matchday:
                    null
            }

        ]

    },


    /*
    =====================================
    REKORDE
    =====================================
    */

    records: {

        highestSeasonScore: {
            managerId: null,
            value: 0
        },

        highestMatchdayScore: {
            managerId: null,
            value: 0
        },

        highestSquadValue: {
            managerId: null,
            value: 0
        },

        mostMatchdayWinsInSeason: {
            managerId: null,
            value: 0
        }

    }

};


/*
=========================================
STANDARD-MANAGER
=========================================
*/

function createManager(
    id,
    name
) {

    return {

        id: id,

        name: name,


        /*
        =================================
        QUALIFIKATION
        =================================
        */

        qualification: {

            group:
                null,

            scores:
                [],

            points:
                0,

            matchdayWins:
                0,

            currentPosition:
                null

        },


        /*
        =================================
        HAUPTRUNDE
        =================================
        */

        mainRound: {

            league:
                null,

            scores:
                [],

            points:
                0,

            matchdayWins:
                0,

            currentPosition:
                null,

            finalPosition:
                null

        },


        /*
        =================================
        POKAL
        =================================

        Diese Werte werden später aus
        dem Pokalbaum automatisch erzeugt.
        */

        cup: {

            preliminaryRoundWin:
                false,

            stage:
                "round-of-16"

        },


        /*
        =================================
        OPTIONALE ZUKUNFTSDATEN
        =================================
        */

        career: {

            seasonsPlayed:
                0,

            highestLegendRank:
                null

        }

    };

}


/*
=========================================
DATEN NEU BERECHNEN
=========================================
*/

function recalculateLeagueData() {

    assignQualificationGroups();

    assignMainRoundLeagues();

    calculateManagerTotals();

    calculateQualificationPositions();

    calculateMainRoundPositions();

    calculateQualificationMatchdayWins();

    calculateMainRoundMatchdayWins();

    calculateAutomaticRecords();

}


/*
=========================================
QUALIFIKATIONSGRUPPEN ZUWEISEN
=========================================
*/

function assignQualificationGroups() {

    const groups =
        leagueData.qualificationGroups;


    Object.entries(
        groups
    ).forEach(
        ([groupName, managerIds]) => {

            managerIds.forEach(
                managerId => {

                    const manager =
                        getManagerById(
                            managerId
                        );


                    if (!manager) {
                        return;
                    }


                    manager.qualification.group =
                        groupName;

                }
            );

        }
    );

}


/*
=========================================
HAUPTRUNDEN-LIGEN ZUWEISEN
=========================================
*/

function assignMainRoundLeagues() {

    leagueData.leagues
        .championsLeague
        .forEach(
            managerId => {

                const manager =
                    getManagerById(
                        managerId
                    );


                if (manager) {

                    manager.mainRound.league =
                        "champions-league";

                }

            }
        );


    leagueData.leagues
        .kreisliga
        .forEach(
            managerId => {

                const manager =
                    getManagerById(
                        managerId
                    );


                if (manager) {

                    manager.mainRound.league =
                        "kreisliga";

                }

            }
        );

}


/*
=========================================
GESAMTPUNKTE
=========================================
*/

function calculateManagerTotals() {

    leagueData.managers.forEach(
        manager => {

            manager.qualification.points =
                sumScores(
                    manager
                        .qualification
                        .scores
                );


            manager.mainRound.points =
                sumScores(
                    manager
                        .mainRound
                        .scores
                );

        }
    );

}


/*
=========================================
PUNKTELISTE ADDIEREN
=========================================
*/

function sumScores(scores) {

    if (
        !Array.isArray(scores)
    ) {
        return 0;
    }


    return scores.reduce(
        (
            total,
            score
        ) => {

            const numericScore =
                Number(score);


            if (
                Number.isNaN(
                    numericScore
                )
            ) {
                return total;
            }


            return (
                total +
                numericScore
            );

        },
        0
    );

}


/*
=========================================
QUALIFIKATIONSPLÄTZE
=========================================
*/

function calculateQualificationPositions() {

    Object.keys(
        leagueData
            .qualificationGroups
    ).forEach(
        groupName => {

            const managers =
                getQualificationManagers(
                    groupName
                );


            applyPositions(
                managers,
                "qualification"
            );

        }
    );

}


/*
=========================================
HAUPTRUNDENPLÄTZE
=========================================
*/

function calculateMainRoundPositions() {

    const championsLeagueManagers =
        getMainRoundManagers(
            "champions-league"
        );


    const kreisligaManagers =
        getMainRoundManagers(
            "kreisliga"
        );


    applyPositions(
        championsLeagueManagers,
        "mainRound"
    );


    applyPositions(
        kreisligaManagers,
        "mainRound"
    );

}


/*
=========================================
PLÄTZE BERECHNEN
=========================================
*/

function applyPositions(
    managers,
    competitionKey
) {

    const sorted =
        [...managers]
            .sort(
                (
                    managerA,
                    managerB
                ) => {

                    return (
                        managerB[
                            competitionKey
                        ].points
                        -
                        managerA[
                            competitionKey
                        ].points
                    );

                }
            );


    sorted.forEach(
        (
            manager,
            index
        ) => {

            manager[
                competitionKey
            ].currentPosition =
                index + 1;

        }
    );

}


/*
=========================================
SPIELTAGSSIEGE QUALIFIKATION
=========================================
*/

function calculateQualificationMatchdayWins() {

    Object.keys(
        leagueData
            .qualificationGroups
    ).forEach(
        groupName => {

            const managers =
                getQualificationManagers(
                    groupName
                );


            calculateMatchdayWins(
                managers,
                "qualification"
            );

        }
    );

}


/*
=========================================
SPIELTAGSSIEGE HAUPTRUNDE
=========================================
*/

function calculateMainRoundMatchdayWins() {

    calculateMatchdayWins(
        getMainRoundManagers(
            "champions-league"
        ),
        "mainRound"
    );


    calculateMatchdayWins(
        getMainRoundManagers(
            "kreisliga"
        ),
        "mainRound"
    );

}


/*
=========================================
SPIELTAGSSIEGE AUTOMATISCH
=========================================
*/

function calculateMatchdayWins(
    managers,
    competitionKey
) {

    managers.forEach(
        manager => {

            manager[
                competitionKey
            ].matchdayWins = 0;

        }
    );


    const matchdayCount =
        Math.max(
            0,
            ...managers.map(
                manager =>
                    manager[
                        competitionKey
                    ].scores.length
            )
        );


    for (
        let matchdayIndex = 0;
        matchdayIndex <
            matchdayCount;
        matchdayIndex++
    ) {

        const matchdayResults =
            managers
                .map(
                    manager => {

                        return {

                            manager:
                                manager,

                            score:
                                manager[
                                    competitionKey
                                ].scores[
                                    matchdayIndex
                                ]

                        };

                    }
                )
                .filter(
                    result =>
                        result.score !==
                            undefined &&
                        result.score !==
                            null
                );


        if (
            !matchdayResults.length
        ) {
            continue;
        }


        const highestScore =
            Math.max(
                ...matchdayResults.map(
                    result =>
                        Number(
                            result.score
                        )
                )
            );


        const winners =
            matchdayResults.filter(
                result =>
                    Number(
                        result.score
                    ) ===
                    highestScore
            );


        /*
        Bei Punktgleichheit bekommen
        alle punktgleichen Manager
        einen Spieltagssieg.
        */

        winners.forEach(
            winner => {

                winner.manager[
                    competitionKey
                ].matchdayWins += 1;

            }
        );

    }

}


/*
=========================================
AUTOMATISCHE REKORDE
=========================================
*/

function calculateAutomaticRecords() {

    calculateHighestMatchdayScore();

    calculateMostMatchdayWins();

}


/*
=========================================
HÖCHSTE SPIELTAGSLEISTUNG
=========================================
*/

function calculateHighestMatchdayScore() {

    let bestManagerId =
        null;

    let bestScore =
        0;


    leagueData.managers.forEach(
        manager => {

            const allScores = [

                ...manager
                    .qualification
                    .scores,

                ...manager
                    .mainRound
                    .scores

            ];


            allScores.forEach(
                score => {

                    const numericScore =
                        Number(score);


                    if (
                        numericScore >
                        bestScore
                    ) {

                        bestScore =
                            numericScore;

                        bestManagerId =
                            manager.id;

                    }

                }
            );

        }
    );


    leagueData.records
        .highestMatchdayScore = {

            managerId:
                bestManagerId,

            value:
                bestScore

        };

}


/*
=========================================
MEISTE SPIELTAGSSIEGE
=========================================
*/

function calculateMostMatchdayWins() {

    let bestManagerId =
        null;

    let bestWins =
        0;


    leagueData.managers.forEach(
        manager => {

            const wins =
                (
                    manager
                        .qualification
                        .matchdayWins
                )
                +
                (
                    manager
                        .mainRound
                        .matchdayWins
                );


            if (
                wins >
                bestWins
            ) {

                bestWins =
                    wins;

                bestManagerId =
                    manager.id;

            }

        }
    );


    leagueData.records
        .mostMatchdayWinsInSeason = {

            managerId:
                bestManagerId,

            value:
                bestWins

        };

}


/*
=========================================
QUALIFIKATIONSMANAGER
=========================================
*/

function getQualificationManagers(
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
HAUPTRUNDENMANAGER
=========================================
*/

function getMainRoundManagers(
    leagueName
) {

    return leagueData.managers.filter(
        manager =>
            manager
                .mainRound
                .league ===
            leagueName
    );

}


/*
=========================================
MANAGER SUCHEN
=========================================
*/

function getManagerById(
    managerId
) {

    return leagueData.managers.find(
        manager =>
            manager.id ===
            managerId
    ) || null;

}


/*
=========================================
SPIELTAGSZAHL
=========================================
*/

function getCurrentQualificationMatchday() {

    return Math.max(
        0,
        ...leagueData.managers.map(
            manager =>
                manager
                    .qualification
                    .scores
                    .length
        )
    );

}


function getCurrentMainRoundMatchday() {

    return Math.max(
        0,
        ...leagueData.managers.map(
            manager =>
                manager
                    .mainRound
                    .scores
                    .length
        )
    );

}


/*
=========================================
WÖCHENTLICHE PUNKTE EINTRAGEN
=========================================

Diese Hilfsfunktion brauchen wir später
nicht zwingend auf GitHub zu benutzen.

Sie zeigt aber genau, wie unser System
funktioniert.

Beispiel:

addQualificationScore(
    "ben",
    1542
);

=========================================
*/

function addQualificationScore(
    managerId,
    score
) {

    const manager =
        getManagerById(
            managerId
        );


    if (!manager) {
        return;
    }


    manager
        .qualification
        .scores
        .push(
            Number(score)
        );


    recalculateLeagueData();

}


function addMainRoundScore(
    managerId,
    score
) {

    const manager =
        getManagerById(
            managerId
        );


    if (!manager) {
        return;
    }


    manager
        .mainRound
        .scores
        .push(
            Number(score)
        );


    recalculateLeagueData();

}


/*
=========================================
SAISONABSCHLUSS
=========================================
*/

function finishMainRound() {

    leagueData.managers.forEach(
        manager => {

            if (
                manager
                    .mainRound
                    .currentPosition
            ) {

                manager
                    .mainRound
                    .finalPosition =
                    manager
                        .mainRound
                        .currentPosition;

            }

        }
    );


    leagueData.phase =
        "finished";


    recalculateLeagueData();

}


/*
=========================================
ERSTE BERECHNUNG BEIM LADEN
=========================================
*/

recalculateLeagueData();