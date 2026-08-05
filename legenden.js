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
        rank => legendPoints >= rank.minimumPoints
    );
}

/*
=========================================
SAISONLEISTUNG EINER PHASE
=========================================
*/

function calculatePhasePoints(phase, leagueType) {
    if (!phase) {
        return 0;
    }

    const kickbasePoints =
        Math.floor((phase.points || 0) / 1000) *
        LEGEND_RULES.pointsPerThousand;

    const matchdayPoints =
        (phase.matchdayWins || 0) *
        LEGEND_RULES.matchdayWin;

    const positionPoints =
        LEGEND_RULES.currentPosition[phase.currentPosition] || 0;

    const multiplier =
        LEGEND_RULES.leagueMultiplier[leagueType] || 1;

    return Math.round(
        (kickbasePoints + matchdayPoints + positionPoints) *
        multiplier
    );
}


/*
=========================================
QUALIFIKATION
=========================================
*/

function calculateQualificationPoints(manager) {
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

function calculateMainRoundPerformance(manager) {
    if (!manager.mainRound || !manager.mainRound.league) {
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

function calculateFinalPositionPoints(manager) {
    const mainRound = manager.mainRound;

    if (
        !mainRound ||
        !mainRound.league ||
        !mainRound.finalPosition
    ) {
        return 0;
    }

    const leagueTable =
        LEGEND_RULES.finalPosition[mainRound.league];

    if (!leagueTable) {
        return 0;
    }

    return leagueTable[mainRound.finalPosition] || 0;
}


/*
=========================================
POKAL
=========================================
*/

function calculateCupPoints(manager) {
    if (!manager.cup) {
        return 0;
    }

    const stagePoints =
        LEGEND_RULES.cup[manager.cup.stage] || 0;

    const preliminaryBonus =
        manager.cup.preliminaryRoundWin ? 1 : 0;

    return stagePoints + preliminaryBonus;
}


/*
=========================================
REKORDE
=========================================
*/

function calculateRecordPoints(manager) {
    let points = 0;

    Object.entries(leagueData.records).forEach(
        ([recordName, recordData]) => {
            if (
                recordData.managerId === manager.id &&
                LEGEND_RULES.records[recordName]
            ) {
                points +=
                    LEGEND_RULES.records[recordName];
            }
        }
    );

    return points;
}


/*
=========================================
GESAMTBERECHNUNG
=========================================
*/

function calculateLegendPoints(manager) {
    return (
        calculateQualificationPoints(manager) +
        calculateMainRoundPerformance(manager) +
        calculateFinalPositionPoints(manager) +
        calculateCupPoints(manager) +
        calculateRecordPoints(manager)
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
    const legendPoints = calculateLegendPoints(manager);
    const legendRank = getLegendRank(legendPoints);

    return {
        ...manager,
        legendPoints: legendPoints,
        legendRank: legendRank
    };
})
        .sort((a, b) => {
            if (b.legendPoints !== a.legendPoints) {
                return b.legendPoints - a.legendPoints;
            }

            return a.name.localeCompare(b.name, "de");
        });
}