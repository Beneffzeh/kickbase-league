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