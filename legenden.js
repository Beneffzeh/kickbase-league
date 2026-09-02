/*
=========================================
KICKBASE LEAGUE – LEGENDENPUNKTE
=========================================
*/

const LEGEND_RULES = {

    pointsPerThousand: 1,

    matchdayWin: 2,


    currentPosition: {

        1: 5,
        2: 4,
        3: 3,
        4: 2,
        5: 1

    },


    leagueMultiplier: {

        qualification: 1,

        "champions-league": 1,

        kreisliga: 0.8

    },


    finalPosition: {

        "champions-league": {

            1: 55,
            2: 40,
            3: 30,
            4: 23,
            5: 19,
            6: 15,
            7: 12,
            8: 9,
            9: 7

        },


        kreisliga: {

            1: 32,
            2: 24,
            3: 18,
            4: 14,
            5: 11,
            6: 8,
            7: 6,
            8: 4,
            9: 3

        }

    },


    cup: {

        "preliminary-round": 0,

        "round-of-16": 0,

        "quarter-final": 5,

        "semi-final": 9,

        final: 14,

        winner: 22

    },


    records: {

        highestSeasonScore: 10,

        highestMatchdayScore: 5,

        highestSquadValue: 5,

        mostMatchdayWinsInSeason: 5

    }

};



/*
=========================================
RANGSYSTEM
=========================================
*/

const LEGEND_RANKS = [

    {

        name: "Legende",

        minimumPoints: 800,

        className: "rank-legend",

        icon: "crown"

    },


    {

        name: "Champion",

        minimumPoints: 550,

        className: "rank-champion",

        icon: "trophy"

    },


    {

        name: "Elite",

        minimumPoints: 350,

        className: "rank-elite",

        icon: "gem"

    },


    {

        name: "Profi",

        minimumPoints: 200,

        className: "rank-professional",

        icon: "shield-check"

    },


    {

        name: "Amateur",

        minimumPoints: 100,

        className: "rank-amateur",

        icon: "shield"

    },


    {

        name: "Anwärter",

        minimumPoints: 40,

        className: "rank-contender",

        icon: "badge"

    },


    {

        name: "Rookie",

        minimumPoints: 0,

        className: "rank-rookie",

        icon: "circle-user-round"

    }

];



function getLegendRank(legendPoints) {

    return LEGEND_RANKS.find(

        rank =>
            legendPoints >=
            rank.minimumPoints

    );

}



/*
=========================================
SAISONLEISTUNG EINER PHASE
=========================================
*/

function calculatePhasePoints(
    phase,
    leagueType
) {

    if (!phase) {

        return 0;

    }


    const kickbasePoints =

        Math.floor(
            (phase.points || 0) / 1000
        ) *

        LEGEND_RULES.pointsPerThousand;


    const matchdayPoints =

        (phase.matchdayWins || 0) *

        LEGEND_RULES.matchdayWin;


    const positionPoints =

        LEGEND_RULES.currentPosition[
            phase.currentPosition
        ] || 0;


    const multiplier =

        LEGEND_RULES.leagueMultiplier[
            leagueType
        ] || 1;


    return Math.round(

        (
            kickbasePoints +
            matchdayPoints +
            positionPoints
        ) *

        multiplier

    );

}



/*
=========================================
QUALIFIKATION
=========================================
*/

function calculateQualificationPoints(
    manager
) {

    return calculatePhasePoints(

        manager.qualification,

        "qualification"

    );

}



/*
=========================================
HAUPTPHASE
=========================================
*/

function calculateMainRoundPerformance(
    manager
) {

    if (
        !manager.mainRound ||
        !manager.mainRound.league
    ) {

        return 0;

    }


    return calculatePhasePoints(

        manager.mainRound,

        manager.mainRound.league

    );

}



/*
=========================================
SAISONABSCHLUSS
=========================================
*/

function calculateFinalPositionPoints(
    manager
) {

    const mainRound =
        manager.mainRound;


    if (
        !mainRound ||
        !mainRound.league ||
        !mainRound.finalPosition
    ) {

        return 0;

    }


    const leagueTable =

        LEGEND_RULES.finalPosition[
            mainRound.league
        ];


    if (!leagueTable) {

        return 0;

    }


    return (
        leagueTable[
            mainRound.finalPosition
        ] || 0
    );

}



/*
=========================================
POKAL
=========================================
*/

function calculateCupPoints(
    manager
) {

    if (!manager.cup) {

        return 0;

    }


    const stagePoints =

        LEGEND_RULES.cup[
            manager.cup.stage
        ] || 0;


    const preliminaryBonus =

        manager.cup.preliminaryRoundWin
            ? 1
            : 0;


    return (
        stagePoints +
        preliminaryBonus
    );

}



/*
=========================================
REKORDE
=========================================
*/

function calculateRecordPoints(
    manager
) {

    let points = 0;


    if (
        typeof leagueData === "undefined" ||
        !leagueData.records
    ) {

        return points;

    }


    Object.entries(
        leagueData.records
    ).forEach(

        ([
            recordName,
            recordData
        ]) => {

            if (
                recordData &&
                recordData.managerId ===
                    manager.id &&
                LEGEND_RULES.records[
                    recordName
                ]
            ) {

                points +=
                    LEGEND_RULES.records[
                        recordName
                    ];

            }

        }

    );


    return points;

}



/*
=========================================
DETAILLIERTE LP-AUFSCHLÜSSELUNG
=========================================
*/

function getLegendPointBreakdown(
    manager
) {

    const breakdown = [];


    addQualificationBreakdown(
        manager,
        breakdown
    );


    addMainRoundBreakdown(
        manager,
        breakdown
    );


    addFinalPositionBreakdown(
        manager,
        breakdown
    );


    addCupBreakdown(
        manager,
        breakdown
    );


    addRecordBreakdown(
        manager,
        breakdown
    );


    return breakdown;

}



/*
=========================================
QUALIFIKATION – DETAILS
=========================================
*/

function addQualificationBreakdown(
    manager,
    breakdown
) {

    const phase =
        manager.qualification;


    if (!phase) {

        return;

    }


    const kickbaseLP =

        Math.floor(
            (phase.points || 0) / 1000
        ) *

        LEGEND_RULES.pointsPerThousand;


    const matchdayWinLP =

        (phase.matchdayWins || 0) *

        LEGEND_RULES.matchdayWin;


    const positionLP =

        LEGEND_RULES.currentPosition[
            phase.currentPosition
        ] || 0;


    if (kickbaseLP > 0) {

        breakdown.push({

            section:
                getQualificationLabel(
                    phase
                ),

            icon:
                "target",

            title:
                "Kickbase-Punkte",

            detail:
                `${formatLegendNumber(
                    phase.points || 0
                )} Punkte`,

            points:
                kickbaseLP,

            counted:
                true

        });

    }


    if (matchdayWinLP > 0) {

        breakdown.push({

            section:
                getQualificationLabel(
                    phase
                ),

            icon:
                "trophy",

            title:
                "Spieltagssiege",

            detail:
                formatMatchdayWins(
                    phase.matchdayWins || 0
                ),

            points:
                matchdayWinLP,

            counted:
                true

        });

    }


    if (positionLP > 0) {

        breakdown.push({

            section:
                getQualificationLabel(
                    phase
                ),

            icon:
                "chart-no-axes-column-increasing",

            title:
                "Aktueller Tabellenplatz",

            detail:
                `Platz ${phase.currentPosition}`,

            points:
                positionLP,

            counted:
                true

        });

    }

}



/*
=========================================
HAUPTPHASE – DETAILS
=========================================
*/

function addMainRoundBreakdown(
    manager,
    breakdown
) {

    const phase =
        manager.mainRound;


    if (
        !phase ||
        !phase.league
    ) {

        return;

    }


    const leagueLabel =

        getLeagueLabel(
            phase.league
        );


    const multiplier =

        LEGEND_RULES.leagueMultiplier[
            phase.league
        ] || 1;


    const kickbaseBaseLP =

        Math.floor(
            (phase.points || 0) / 1000
        ) *

        LEGEND_RULES.pointsPerThousand;


    const matchdayBaseLP =

        (phase.matchdayWins || 0) *

        LEGEND_RULES.matchdayWin;


    const positionBaseLP =

        LEGEND_RULES.currentPosition[
            phase.currentPosition
        ] || 0;


    /*
    =====================================
    CHAMPIONS LEAGUE
    Faktor 1, daher können die einzelnen
    LP direkt angezeigt werden.
    =====================================
    */

    if (multiplier === 1) {


        if (kickbaseBaseLP > 0) {

            breakdown.push({

                section:
                    leagueLabel,

                icon:
                    "target",

                title:
                    "Kickbase-Punkte",

                detail:
                    `${formatLegendNumber(
                        phase.points || 0
                    )} Punkte`,

                points:
                    kickbaseBaseLP,

                counted:
                    true

            });

        }


        if (matchdayBaseLP > 0) {

            breakdown.push({

                section:
                    leagueLabel,

                icon:
                    "trophy",

                title:
                    "Spieltagssiege",

                detail:
                    formatMatchdayWins(
                        phase.matchdayWins || 0
                    ),

                points:
                    matchdayBaseLP,

                counted:
                    true

            });

        }


        if (positionBaseLP > 0) {

            breakdown.push({

                section:
                    leagueLabel,

                icon:
                    "chart-no-axes-column-increasing",

                title:
                    "Aktueller Tabellenplatz",

                detail:
                    `Platz ${phase.currentPosition}`,

                points:
                    positionBaseLP,

                counted:
                    true

            });

        }


        return;

    }


    /*
    =====================================
    KREISLIGA
    Faktor 0,8 wird auf die gesamte
    Saisonleistung angewendet.
    =====================================
    */


    if (kickbaseBaseLP > 0) {

        breakdown.push({

            section:
                leagueLabel,

            icon:
                "target",

            title:
                "Kickbase-Punkte",

            detail:
                `${formatLegendNumber(
                    phase.points || 0
                )} Punkte · ${kickbaseBaseLP} Basis-LP`,

            points:
                null,

            counted:
                false

        });

    }


    if (matchdayBaseLP > 0) {

        breakdown.push({

            section:
                leagueLabel,

            icon:
                "trophy",

            title:
                "Spieltagssiege",

            detail:
                `${formatMatchdayWins(
                    phase.matchdayWins || 0
                )} · ${matchdayBaseLP} Basis-LP`,

            points:
                null,

            counted:
                false

        });

    }


    if (positionBaseLP > 0) {

        breakdown.push({

            section:
                leagueLabel,

            icon:
                "chart-no-axes-column-increasing",

            title:
                "Aktueller Tabellenplatz",

            detail:
                `Platz ${phase.currentPosition} · ${positionBaseLP} Basis-LP`,

            points:
                null,

            counted:
                false

        });

    }


    const baseTotal =

        kickbaseBaseLP +
        matchdayBaseLP +
        positionBaseLP;


    const finalPhaseLP =

        calculateMainRoundPerformance(
            manager
        );


    if (baseTotal > 0) {

        breakdown.push({

            section:
                leagueLabel,

            icon:
                "calculator",

            title:
                "Kreisliga-Wertung",

            detail:
                `${baseTotal} Basis-LP × ${formatMultiplier(
                    multiplier
                )}`,

            points:
                finalPhaseLP,

            counted:
                true,

            total:
                true

        });

    }

}



/*
=========================================
SAISONABSCHLUSS – DETAILS
=========================================
*/

function addFinalPositionBreakdown(
    manager,
    breakdown
) {

    const mainRound =
        manager.mainRound;


    if (
        !mainRound ||
        !mainRound.league ||
        !mainRound.finalPosition
    ) {

        return;

    }


    const points =

        calculateFinalPositionPoints(
            manager
        );


    if (points <= 0) {

        return;

    }


    breakdown.push({

        section:
            "Saisonabschluss",

        icon:
            "medal",

        title:
            "Abschlussplatzierung",

        detail:
            `${getLeagueLabel(
                mainRound.league
            )} · Platz ${mainRound.finalPosition}`,

        points:
            points,

        counted:
            true

    });

}



/*
=========================================
POKAL – DETAILS
=========================================
*/

function addCupBreakdown(
    manager,
    breakdown
) {

    const cup =
        manager.cup;


    if (!cup) {

        return;

    }


    const stagePoints =

        LEGEND_RULES.cup[
            cup.stage
        ] || 0;


    if (stagePoints > 0) {

        breakdown.push({

            section:
                "Kickbase-Pokal",

            icon:
                "trophy",

            title:
                getCupStageLabel(
                    cup.stage
                ),

            detail:
                "Höchste erreichte Runde",

            points:
                stagePoints,

            counted:
                true

        });

    }


    if (
        cup.preliminaryRoundWin
    ) {

        breakdown.push({

            section:
                "Kickbase-Pokal",

            icon:
                "badge-check",

            title:
                "Vorrundensieg",

            detail:
                "Zusätzlicher Bonus",

            points:
                1,

            counted:
                true

        });

    }

}



/*
=========================================
REKORDE – DETAILS
=========================================
*/

function addRecordBreakdown(
    manager,
    breakdown
) {

    if (
        typeof leagueData === "undefined" ||
        !leagueData.records
    ) {

        return;

    }


    Object.entries(
        leagueData.records
    ).forEach(

        ([
            recordName,
            recordData
        ]) => {

            const recordPoints =

                LEGEND_RULES.records[
                    recordName
                ];


            if (
                !recordData ||
                recordData.managerId !==
                    manager.id ||
                !recordPoints
            ) {

                return;

            }


            breakdown.push({

                section:
                    "Rekorde",

                icon:
                    "medal",

                title:
                    getRecordLabel(
                        recordName
                    ),

                detail:
                    "Aktueller Rekordhalter",

                points:
                    recordPoints,

                counted:
                    true

            });

        }

    );

}



/*
=========================================
GESAMTBERECHNUNG
=========================================
*/

function calculateLegendPoints(
    manager
) {

    return (

        calculateQualificationPoints(
            manager
        ) +

        calculateMainRoundPerformance(
            manager
        ) +

        calculateFinalPositionPoints(
            manager
        ) +

        calculateCupPoints(
            manager
        ) +

        calculateRecordPoints(
            manager
        )

    );

}



/*
=========================================
RANGLISTE
=========================================
*/

function createLegendRanking() {

    return leagueData.managers

        .map(manager => {


            const legendPoints =

                calculateLegendPoints(
                    manager
                );


            const legendRank =

                getLegendRank(
                    legendPoints
                );


            const legendBreakdown =

                getLegendPointBreakdown(
                    manager
                );


            return {

                ...manager,

                legendPoints:
                    legendPoints,

                legendRank:
                    legendRank,

                legendBreakdown:
                    legendBreakdown

            };

        })


        .sort((a, b) => {


            if (
                b.legendPoints !==
                a.legendPoints
            ) {

                return (
                    b.legendPoints -
                    a.legendPoints
                );

            }


            return a.name.localeCompare(
                b.name,
                "de"
            );

        });

}



/*
=========================================
HILFSFUNKTIONEN FÜR DIE AUFSCHLÜSSELUNG
=========================================
*/

function getQualificationLabel(
    phase
) {

    if (
        phase &&
        phase.group
    ) {

        return `Qualifikation ${phase.group}`;

    }


    return "Qualifikation";

}



function getLeagueLabel(
    league
) {

    if (
        league ===
        "champions-league"
    ) {

        return "Champions League";

    }


    if (
        league ===
        "kreisliga"
    ) {

        return "Kreisliga";

    }


    if (
        league ===
        "qualification"
    ) {

        return "Qualifikation";

    }


    return "Liga";

}



function getCupStageLabel(
    stage
) {

    const labels = {

        "preliminary-round":
            "Vorrunde",

        "round-of-16":
            "Achtelfinale",

        "quarter-final":
            "Viertelfinale",

        "semi-final":
            "Halbfinale",

        final:
            "Finale",

        winner:
            "Pokalsieg"

    };


    return (
        labels[stage] ||
        stage
    );

}



function getRecordLabel(
    recordName
) {

    const labels = {

        highestSeasonScore:
            "Höchste Saisonpunktzahl",

        highestMatchdayScore:
            "Höchste Spieltagswertung",

        highestSquadValue:
            "Höchster Teamwert",

        mostMatchdayWinsInSeason:
            "Meiste Spieltagssiege einer Saison"

    };


    return (
        labels[recordName] ||
        recordName
    );

}



function formatLegendNumber(
    value
) {

    return Number(
        value || 0
    ).toLocaleString(
        "de-DE"
    );

}



function formatMatchdayWins(
    wins
) {

    const value =
        Number(wins || 0);


    return value === 1

        ? "1 Spieltagssieg"

        : `${value} Spieltagssiege`;

}



function formatMultiplier(
    multiplier
) {

    return Number(
        multiplier
    ).toLocaleString(
        "de-DE",
        {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2
        }
    );

}