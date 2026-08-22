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
    QUALIFIKATION – SPIELTAGSPUNKTE
    =====================================
    */

    qualificationMatchdays: [

        {
            matchday: 1,

            scores: {

                tim: 0,
                tobsen: 0,
                enrico: 0,
                bruno: 0,
                nils: 0,
                sauer: 0,
                marcel: 0,
                reichi: 0,
                messe: 0,

                schwartzer: 0,
                janis: 0,
                heiko: 0,
                marco: 0,
                malik: 0,
                nikolaj: 0,
                ben: 0,
                philipp: 0,
                fabio: 0

            }

        }

    ],


    /*
    =====================================
    HAUPTRUNDE
    =====================================
    */

    leagues: {

        championsLeague: [],

        kreisliga: []

    },


    /*
    =====================================
    HAUPTPHASE – SPIELTAGSPUNKTE
    =====================================
    */

    mainRoundMatchdays: [

        /*
        Beispiel nach Start der Hauptphase:

        {
            matchday: 1,

            scores: {

                managerId: 0

            }

        }
        */

    ],


    /*
    =====================================
    POKAL
    =====================================
    */

    cup: {

        preliminaryRound: [

            {
                id: "VR1",
                home: "ben",
                away: "enrico",
                matchday: 4
            },

            {
                id: "VR2",
                home: "tim",
                away: "philipp",
                matchday: 4
            }

        ],


        roundOf16: [

            {
                id: "AF1",
                home: "winner-VR1",
                away: "nils",
                matchday: 8
            },

            {
                id: "AF2",
                home: "reichi",
                away: "messe",
                matchday: 8
            },

            {
                id: "AF3",
                home: "marcel",
                away: "fabio",
                matchday: 8
            },

            {
                id: "AF4",
                home: "sauer",
                away: "marco",
                matchday: 8
            },

            {
                id: "AF5",
                home: "malik",
                away: "janis",
                matchday: 8
            },

            {
                id: "AF6",
                home: "heiko",
                away: "schwartzer",
                matchday: 8
            },

            {
                id: "AF7",
                home: "tobsen",
                away: "nikolaj",
                matchday: 8
            },

            {
                id: "AF8",
                home: "bruno",
                away: "winner-VR2",
                matchday: 8
            }

        ],


        quarterFinals: [

            {
                id: "VF1",
                home: "winner-AF1",
                away: "winner-AF2",
                matchday: 18
            },

            {
                id: "VF2",
                home: "winner-AF3",
                away: "winner-AF4",
                matchday: 18
            },

            {
                id: "VF3",
                home: "winner-AF5",
                away: "winner-AF6",
                matchday: 18
            },

            {
                id: "VF4",
                home: "winner-AF7",
                away: "winner-AF8",
                matchday: 18
            }

        ],


        semiFinals: [

            {
                id: "HF1",
                home: "winner-VF1",
                away: "winner-VF2",
                matchday: 26
            },

            {
                id: "HF2",
                home: "winner-VF3",
                away: "winner-VF4",
                matchday: 26
            }

        ],


        final: [

            {
                id: "F1",
                home: "winner-HF1",
                away: "winner-HF2",
                matchday: 34
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

    },


    /*
    =====================================
    NEWS – TRANSFERS
    =====================================

    Neueste Meldungen werden auf der
    News-Seite automatisch oben angezeigt.

    Bilder liegen im Hauptordner.
    */

    newsTransfers: [

{
    date: "2026-08-22",

    managerId:
        "schwartzer",

    player:
        "Aleix Garcia",

    price:
        41000000,

    league:
        "Qualifikation B",

    image:
        "/kickbase-league/news-garcia.JPG",

    title:
        "Nächster Coup! Schwartzer holt Aleix Garcia für 41 Mio. €",

    text:
        "Schwartzer legt auf dem Transfermarkt nach: Aleix Garcia wechselt für 41 Mio. € von Malik zu Schwartzer. Nach Amiri folgt damit bereits der nächste namhafte Neuzugang in Qualifikation B."
},

{
    date: "2026-08-22",

    managerId:
        "ben",

    player:
        "Joshua Kimmich",

    price:
        65200000,

    league:
        "Qualifikation B",

    image:
    "/kickbase-league/news-kimmich2.PNG",

    title:
        "ERSTER BIG BOY VOM MARKT! Ben schnappt sich Kimmich für 65,2 Mio. €",

    text:
        "Der erste ganz große Transfer der Saison ist perfekt: Ben sichert sich Joshua Kimmich für satte 65,2 Mio. €. Damit ist der erste Big Boy vom Markt – und in Qualifikation B setzt Ben früh ein deutliches Ausrufezeichen."
},

        {
            date: "2026-08-21",

            managerId:
                "nikolaj",

            player:
                "Ismael Saibari",

            price:
                37000000,

            league:
                "Qualifikation B",

            image:
                "/kickbase-league/news-saibari.PNG",

            title:
                "Nikolaj greift tief in die Tasche: Saibari kommt für 37 Mio. €",

            text:
                "Nikolaj verstärkt seinen Kader in Qualifikation B mit Ismael Saibari. Für den Angreifer werden 37 Mio. € fällig."
        },


        {
            date: "2026-08-21",

            managerId:
                "schwartzer",

            player:
                "Nadiem Amiri",

            price:
                35800000,

            league:
                "Qualifikation B",

            image:
                "/kickbase-league/news-amiri.PNG",

            title:
                "Schwartzer schlägt zu: Amiri für 35,8 Mio. € verpflichtet",

            text:
                "Schwartzer setzt in Qualifikation B ein erstes Ausrufezeichen auf dem Transfermarkt und verpflichtet Nadiem Amiri für 35,8 Mio. €."
        }

    ],


    /*
    =====================================
    NEWS – MANUELLE SONDERMELDUNGEN
    =====================================

    Hier können später besondere News
    ergänzt werden, die kein Transfer sind.
    */

    manualNews: []

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

    assignQualificationScores();

    calculateManagerTotals();

    calculateQualificationMatchdayWins();

    calculateQualificationPositions();

    updateMainRoundLeaguesFromQualification();

    assignMainRoundLeagues();

    assignMainRoundScores();

    calculateManagerTotals();

    calculateMainRoundMatchdayWins();

    calculateMainRoundPositions();

    calculateCupProgress();

    calculateAutomaticRecords();

}


/*
=========================================
QUALIFIKATIONSPUNKTE ZUWEISEN
=========================================
*/

function assignQualificationScores() {

    leagueData.managers.forEach(
        manager => {

            manager.qualification.scores = [];

        }
    );


    if (
        !Array.isArray(
            leagueData.qualificationMatchdays
        )
    ) {
        return;
    }


    leagueData.qualificationMatchdays.forEach(
        matchday => {

            if (
                !matchday ||
                !matchday.scores
            ) {
                return;
            }


            leagueData.managers.forEach(
                manager => {

                    const score =
                        matchday.scores[
                            manager.id
                        ];


                    if (
                        score === undefined ||
                        score === null
                    ) {
                        return;
                    }


                    manager
                        .qualification
                        .scores
                        .push(
                            Number(score)
                        );

                }
            );

        }
    );

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
HAUPTPHASENPUNKTE ZUWEISEN
=========================================
*/

function assignMainRoundScores() {

    leagueData.managers.forEach(
        manager => {

            manager.mainRound.scores = [];

        }
    );


    if (
        !Array.isArray(
            leagueData.mainRoundMatchdays
        )
    ) {
        return;
    }


    leagueData.mainRoundMatchdays.forEach(
        matchday => {

            if (
                !matchday ||
                !matchday.scores
            ) {
                return;
            }


            leagueData.managers.forEach(
                manager => {

                    if (
                        !manager.mainRound.league
                    ) {
                        return;
                    }


                    const score =
                        matchday.scores[
                            manager.id
                        ];


                    if (
                        score === undefined ||
                        score === null
                    ) {
                        return;
                    }


                    manager
                        .mainRound
                        .scores
                        .push(
                            Number(score)
                        );

                }
            );

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
AUTOMATISCHE LIGAEINTEILUNG
NACH DER QUALIFIKATION
=========================================
*/

function updateMainRoundLeaguesFromQualification() {

    const currentMatchday =
        getCurrentQualificationMatchday();


    if (currentMatchday < 14) {
        return;
    }


    const groupA =
        getQualificationManagers("A")
            .sort(
                (a, b) =>
                    b.qualification.points -
                    a.qualification.points
            );


    const groupB =
        getQualificationManagers("B")
            .sort(
                (a, b) =>
                    b.qualification.points -
                    a.qualification.points
            );


    if (
        groupA.length !== 9 ||
        groupB.length !== 9
    ) {
        return;
    }


    const championsLeague = [

        ...groupA
            .slice(0, 4)
            .map(manager => manager.id),

        ...groupB
            .slice(0, 4)
            .map(manager => manager.id)

    ];


    const kreisliga = [

        ...groupA
            .slice(5, 9)
            .map(manager => manager.id),

        ...groupB
            .slice(5, 9)
            .map(manager => manager.id)

    ];


    const fifthA =
        groupA[4];

    const fifthB =
        groupB[4];


    if (
        fifthA.qualification.points >
        fifthB.qualification.points
    ) {

        championsLeague.push(
            fifthA.id
        );

        kreisliga.push(
            fifthB.id
        );

    }

    else if (
        fifthB.qualification.points >
        fifthA.qualification.points
    ) {

        championsLeague.push(
            fifthB.id
        );

        kreisliga.push(
            fifthA.id
        );

    }


    leagueData.leagues.championsLeague =
        championsLeague;


    leagueData.leagues.kreisliga =
        kreisliga;

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
POKAL AUTOMATISCH BERECHNEN
=========================================
*/

function calculateCupProgress() {

    leagueData.managers.forEach(
        manager => {

            manager.cup = {
                preliminaryRoundWin: false,
                stage: "round-of-16"
            };

        }
    );


    const winners = {};


    processCupRound(
        leagueData.cup.preliminaryRound,
        winners,
        "preliminary-round"
    );


    processCupRound(
        leagueData.cup.roundOf16,
        winners,
        "round-of-16"
    );


    processCupRound(
        leagueData.cup.quarterFinals,
        winners,
        "quarter-final"
    );


    processCupRound(
        leagueData.cup.semiFinals,
        winners,
        "semi-final"
    );


    processCupRound(
        leagueData.cup.final,
        winners,
        "final"
    );


    if (winners.F1) {

        const champion =
            getManagerById(
                winners.F1
            );


        if (champion) {

            champion.cup.stage =
                "winner";

        }

    }

}


/*
=========================================
EINZELNE POKALRUNDE AUSWERTEN
=========================================
*/

function processCupRound(
    matches,
    winners,
    stage
) {

    if (!Array.isArray(matches)) {
        return;
    }


    matches.forEach(
        match => {

            const homeId =
                resolveCupParticipant(
                    match.home,
                    winners
                );


            const awayId =
                resolveCupParticipant(
                    match.away,
                    winners
                );


            if (
                !homeId ||
                !awayId
            ) {
                return;
            }


            const homeManager =
                getManagerById(
                    homeId
                );


            const awayManager =
                getManagerById(
                    awayId
                );


            if (
                !homeManager ||
                !awayManager
            ) {
                return;
            }


            setReachedCupStage(
                homeManager,
                stage
            );


            setReachedCupStage(
                awayManager,
                stage
            );


            const homeScore =
                getManagerCupScore(
                    homeId,
                    match.matchday
                );


            const awayScore =
                getManagerCupScore(
                    awayId,
                    match.matchday
                );


            if (
                homeScore === null ||
                awayScore === null
            ) {
                return;
            }


            if (
                homeScore === awayScore
            ) {

                console.warn(
                    `Pokalspiel ${match.id} ist punktgleich: ${homeManager.name} ${homeScore} : ${awayScore} ${awayManager.name}`
                );

                return;
            }


            const winnerId =
                homeScore > awayScore
                    ? homeId
                    : awayId;


            winners[
                match.id
            ] =
                winnerId;


            if (
                stage ===
                "preliminary-round"
            ) {

                const winner =
                    getManagerById(
                        winnerId
                    );


                if (winner) {

                    winner.cup
                        .preliminaryRoundWin =
                        true;

                }

            }

        }
    );

}


/*
=========================================
POKALTEILNEHMER AUFLÖSEN
=========================================
*/

function resolveCupParticipant(
    participant,
    winners
) {

    if (!participant) {
        return null;
    }


    if (
        participant.startsWith(
            "winner-"
        )
    ) {

        const matchId =
            participant.replace(
                "winner-",
                ""
            );


        return winners[
            matchId
        ] || null;

    }


    return participant;

}


/*
=========================================
POKALPUNKTE EINES SPIELTAGS
=========================================
*/

function getManagerCupScore(
    managerId,
    bundesligaMatchday
) {

    const manager =
        getManagerById(
            managerId
        );


    if (!manager) {
        return null;
    }


    if (
        bundesligaMatchday <= 14
    ) {

        const score =
            manager
                .qualification
                .scores[
                    bundesligaMatchday - 1
                ];


        if (
            score === undefined ||
            score === null
        ) {
            return null;
        }


        return Number(score);

    }


    const matchdayData =
        leagueData
            .mainRoundMatchdays
            .find(
                item =>
                    item.matchday ===
                    bundesligaMatchday
            );


    if (
        matchdayData &&
        matchdayData.scores &&
        matchdayData.scores[
            managerId
        ] !== undefined &&
        matchdayData.scores[
            managerId
        ] !== null
    ) {

        return Number(
            matchdayData.scores[
                managerId
            ]
        );

    }


    const localMatchday =
        bundesligaMatchday - 14;


    const localMatchdayData =
        leagueData
            .mainRoundMatchdays
            .find(
                item =>
                    item.matchday ===
                    localMatchday
            );


    if (
        localMatchdayData &&
        localMatchdayData.scores &&
        localMatchdayData.scores[
            managerId
        ] !== undefined &&
        localMatchdayData.scores[
            managerId
        ] !== null
    ) {

        return Number(
            localMatchdayData.scores[
                managerId
            ]
        );

    }


    return null;

}


/*
=========================================
HÖCHSTE ERREICHTE POKALRUNDE
=========================================
*/

function setReachedCupStage(
    manager,
    newStage
) {

    const stageOrder = {

        "preliminary-round": 0,

        "round-of-16": 1,

        "quarter-final": 2,

        "semi-final": 3,

        "final": 4,

        "winner": 5

    };


    const currentStage =
        manager.cup.stage;


    if (
        stageOrder[
            newStage
        ] >
        stageOrder[
            currentStage
        ]
    ) {

        manager.cup.stage =
            newStage;

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