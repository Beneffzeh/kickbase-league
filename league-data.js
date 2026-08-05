/*
=========================================
KICKBASE LEAGUE – ZENTRALE LIGADATEN
Saison 2026/27
=========================================

In dieser Datei werden später nur die
tatsächlichen Ligadaten aktualisiert.

Die Legendenpunkte werden NICHT manuell
eingetragen, sondern automatisch berechnet.
*/

const leagueData = {
    season: "2026/27",

    managers: [
        createManager("ben", "Ben"),
        createManager("bruno", "Bruno"),
        createManager("enrico", "Enrico"),
        createManager("fabio", "Fabio"),
        createManager("heiko", "Heiko"),
        createManager("janis", "Janis"),
        createManager("malik", "Malik"),
        createManager("marco", "Marco"),
        createManager("marcel", "Marcel"),
        createManager("messe", "Messe"),
        createManager("nikolaj", "Nikolaj"),
        createManager("nils", "Nils"),
        createManager("philipp", "Philipp"),
        createManager("reichi", "Reichi"),
        createManager("sauer", "Sauer"),
        createManager("schwartzer", "Schwartzer"),
        createManager("tim", "Tim"),
        createManager("tobsen", "Tobsen")
    ],

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
STANDARDDATEN EINES MANAGERS
=========================================
*/

function createManager(id, name) {
    return {
        id: id,
        name: name,

        qualification: {
            group: null,
            points: 0,
            matchdayWins: 0,
            currentPosition: null
        },

        mainRound: {
            league: null,
            points: 0,
            matchdayWins: 0,
            currentPosition: null,
            finalPosition: null
        },

        cup: {
            preliminaryRoundWin: false,
            stage: "round-of-16"
        }
    };
}
/*
=========================================
TEMPORÄRE TESTDATEN
Später wieder löschen
=========================================
*/

const ben = leagueData.managers.find(manager => manager.id === "ben");

ben.qualification = {
    group: "A",
    points: 14600,
    matchdayWins: 3,
    currentPosition: 2
};

ben.mainRound = {
    league: "champions-league",
    points: 23900,
    matchdayWins: 5,
    currentPosition: 1,
    finalPosition: 1
};

ben.cup = {
    preliminaryRoundWin: true,
    stage: "semi-final"
};


const marcel = leagueData.managers.find(
    manager => manager.id === "marcel"
);

marcel.qualification = {
    group: "B",
    points: 13800,
    matchdayWins: 2,
    currentPosition: 3
};

marcel.mainRound = {
    league: "champions-league",
    points: 23100,
    matchdayWins: 4,
    currentPosition: 2,
    finalPosition: 2
};

marcel.cup = {
    preliminaryRoundWin: false,
    stage: "final"
};


const marco = leagueData.managers.find(
    manager => manager.id === "marco"
);

marco.qualification = {
    group: "B",
    points: 13200,
    matchdayWins: 2,
    currentPosition: 5
};

marco.mainRound = {
    league: "kreisliga",
    points: 23800,
    matchdayWins: 5,
    currentPosition: 1,
    finalPosition: 1
};

marco.cup = {
    preliminaryRoundWin: false,
    stage: "quarter-final"
};