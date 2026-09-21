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

            tim: 682,
            tobsen: 1012,
            enrico: 538,
            bruno: 1156,
            nils: 1222,
            sauer: 567,
            marcel: 1141,
            reichi: 1038,
            messe: 1022,

            schwartzer: 764,
            janis: 1152,
            heiko: 815,
            marco: 694,
            malik: 947,
            nikolaj: 648,
            ben: 784,
            philipp: 844,
            fabio: 827

        }

    },

    {
        matchday: 2,

        scores: {

            tim: 763,
            tobsen: 558,
            enrico: 922,
            bruno: 572,
            nils: 1849,
            sauer: 1106,
            marcel: 1124,
            reichi: 380,
            messe: 698,

            schwartzer: 1026,
            janis: 1201,
            heiko: 779,
            marco: 1208,
            malik: 1076,
            nikolaj: 362,
            ben: 1019,
            philipp: 1170,
            fabio: 468

        }

    },

    {
        matchday: 3,

        scores: {

            tim: 869,
            tobsen: 1419,
            enrico: 1248,
            bruno: 0,
            nils: 757,
            sauer: 854,
            marcel: 1040,
            reichi: 1318,
            messe: 1138,

            schwartzer: 1180,
            janis: 804,
            heiko: 621,
            marco: 1060,
            malik: 1305,
            nikolaj: 0,
            ben: 956,
            philipp: 1180,
            fabio: 520

        }

    },

{
    matchday: 4,

    scores: {

        tim: 555,
        tobsen: 1042,
        enrico: 1369,
        bruno: 596,
        nils: 1380,
        sauer: 788,
        marcel: 1155,
        reichi: 1407,
        messe: 1207,

        schwartzer: 827,
        janis: 1081,
        heiko: 794,
        marco: 1002,
        malik: 967,
        nikolaj: 197,
        ben: 897,
        philipp: 1071,
        fabio: 862

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
=========================================
REKORDE
=========================================
*/

records: {

    highestSeasonScore: {
        managerIds: [],
        value: 0
    },

    highestMatchdayScore: {
        managerIds: [],
        value: 0
    },

    highestSquadValue: {
        managerIds: [],
        value: 0
    },

    mostMatchdayWinsInSeason: {
        managerIds: [],
        value: 0
    }

},


/*
=========================================
NEWS – TRANSFERS
=========================================
*/

newsTransfers: [

{
    date: "2026-09-15",

    managerId:
        "schwartzer",

    player:
        "Harry Kane",

    price:
        68800000,

    league:
        "Qualifikation B",

    image:
        "/kickbase-league/news-kane.JPG",

    title:
        "JETZT DOCH! Schwartzer schnappt sich Harry Kane für 68,8 Mio. €",

    text:
        "Beim ersten Mal wollte ihn niemand – jetzt ist der Deal perfekt: Schwartzer verpflichtet Harry Kane für satte 68,8 Mio. € in Qualifikation B. Nach seinem kuriosen Auslaufen ohne Gebot hat einer der größten Stars der Liga damit endlich einen Besitzer gefunden."
},

{
    date: "2026-08-31",

    managerId:
        "reichi",

    player:
        "Michael Olise",

    price:
        76800000,

    league:
        "Qualifikation A",

    image:
        "/kickbase-league/news-olise.JPG",

    title:
        "76,8 MIO.! Reichi schnappt sich Olise im Mega-Deal",

    text:
        "Der nächste Mega-Transfer ist perfekt: Reichi verpflichtet Michael Olise für satte 76,8 Mio. € in Qualifikation A. Damit ist Olise nur knapp hinter Harry Kane der zweitteuerste Transfer der bisherigen Saison."
},

{
    date: "2026-08-31",

    managerId:
        "janis",

    player:
        "Luiz Díaz",

    price:
        56000000,

    league:
        "Qualifikation B",

    image:
        "/kickbase-league/news-diaz.PNG",

    title:
        "NACH SPIELTAG 1: Janis schnappt sich Luiz Díaz für 56 Mio. €",

    text:
        "Nach dem 1. Spieltag schlägt Janis auf dem Transfermarkt zu: Luiz Díaz wechselt für satte 56 Mio. € zu Janis in Qualifikation B. Ein echtes Statement direkt nach dem Saisonauftakt."
},

    {
        date: "2026-08-25",

        managerId:
            "enrico",

        player:
            "Harry Kane",

        price:
            77000000,

        league:
            "Qualifikation A",

        image:
            "/kickbase-league/news-kane.JPG",

        title:
            "NEUER TOP-TRANSFER! Enrico zahlt 77 Mio. € für Harry Kane",

        text:
            "Der bisher größte Deal der Saison ist perfekt: Enrico sichert sich Harry Kane für gewaltige 77 Mio. €. Damit löst der Kane-Transfer Kimmich als bisherigen Top-Deal ab und setzt in Qualifikation A eine neue Bestmarke."
    },


    {
        date: "2026-08-24",

        managerId:
            "tobsen",

        player:
            "Luiz Díaz",

        price:
            61000000,

        league:
            "Qualifikation A",

        image:
            "/kickbase-league/news-diaz.PNG",

        title:
            "NÄCHSTER BIG BOY WEG! Tobsen schnappt sich Luiz Díaz für 61 Mio. €",

        text:
            "Der nächste Hochkaräter ist vom Markt: Tobsen verpflichtet Luiz Díaz für satte 61 Mio. €. Damit landet einer der teuersten Spieler der Liga in Qualifikation A und Tobsen setzt früh ein echtes Ausrufezeichen."
    },


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
=========================================
NEWS – SONDERMELDUNGEN
=========================================
*/

manualNews: [

    {
        date: "2026-08-25",

        type:
            "TRANSFERMARKT",

        icon:
            "circle-alert",

        image:
            "/kickbase-league/news-kane.JPG",

        title:
            "KURIOSES IN QUALI B: Niemand will Harry Kane!",

        text:
            "Damit hätte wohl niemand gerechnet: Harry Kane läuft in Qualifikation B tatsächlich ohne Gebot aus und findet keinen Besitzer. Einer der größten Stars der Liga bleibt damit vorerst auf dem Transfermarkt – ein äußerst ungewöhnlicher Vorgang."
    }

],


/*
=========================================
INTERVIEWS
=========================================
*/

interviews: [

    {
        id:
            "schwartzer-01",

        date:
            "2026-09-15",

        managerId:
            "schwartzer",

        managerName:
            "Schwartzer",

        image:
            "/kickbase-league/news-interview.PNG",

        headline:
            "Schwartzer: „Ich liebe den Druck – unter Druck entstehen Diamanten“",

        teaser:
            "Nach drei Spieltagen, einem turbulenten Saisonstart und dem 68,8-Millionen-Coup um Harry Kane spricht Schwartzer im ersten großen Interview der Kickbase League über seinen Kaderumbau, die Konkurrenz in Qualifikation B und seine Rolle als einer der Favoriten auf den Champions-League-Titel.",

        introduction:
            "Hallo und guten Tag an unsere wundervolle Community. Ich fühle mich sehr geehrt, den Auftakt dieser Interviewreihe machen zu dürfen. Vorab möchte ich ein großes Kompliment an den Organisator der Liga aussprechen. Durch die professionelle Gestaltung und den zusätzlichen Aufwand wird das Ganze noch einmal deutlich unterhaltsamer und macht dadurch noch mehr Spaß.",

        questions: [

            {
                question:
                    "68,8 Millionen für Harry Kane, ein echter Schnapper – hast du damit gerechnet, diesen Weltklasse-Spieler so günstig zu schießen?",

                answer:
                    "Harry Kane ist ein absoluter Glücksfall für meine Mannschaft. Wir sind schon sehr lange auf der Suche nach einem echten Torjäger, jetzt sind wir fündig geworden, und das ausgerechnet beim besten Torjäger der Liga. Wenn mir vor der Saison jemand gesagt hätte, dass ich Harry Kane für knapp 69 Millionen bekommen würde, hätte ich ihn vermutlich für verrückt erklärt. Aufgrund der Dynamik in unserer Liga und der Tatsache, dass die „Big Boys“ teilweise ohne Angebote durchlaufen, war mir allerdings klar, dass ich für Harry keinen übermäßigen Overpay hinlegen musste."
            },

            {
                question:
                    "Nach dem bisherigen Saisonverlauf: Wie zufrieden bist du mit deinem Team, deinen Ergebnissen und wo siehst du noch Verbesserungspotenzial?",

                answer:
                    "Zunächst einmal bin ich mit meinem Auftakt in die Saison durchaus zufrieden. Die ersten drei Spieltage haben bereits gezeigt, in welche Richtung es für meine Mannschaft gehen kann. Dabei gab es sowohl Höhen als auch Tiefen. Der negative Höhepunkt waren sicherlich die Minuspunkte von Nadiem Amiri am dritten Spieltag. Diese Frage steht allerdings auch in engem Zusammenhang mit der Tatsache, dass Harry Kane knapp 70 Millionen meines Budgets gebunden hat. Dadurch bin ich nun gezwungen, meine Mannschaft umfassend umzubauen. Wer am Freitagabend letztlich in meiner Startelf stehen wird, weiß aktuell wohl nur der liebe Gott. In dieser Woche geht es daher zunächst einmal darum, überhaupt elf konkurrenzfähige Starter auf den Platz zu bekommen. Verbesserungspotenzial sehe ich grundsätzlich in allen Mannschaftsteilen. Der klare Fokus liegt aktuell jedoch auf der Abwehr."
            },

            {
                question:
                    "Wenn du in Qualifikation B auf deine Konkurrenz schaust – wer überrascht dich, wer enttäuscht dich und wen siehst du als größten Rivalen?",

                answer:
                    "In unserer Qualifikationsrunde B bin ich vor allem von Malik und Philipp positiv überrascht. Beide haben ihre Kader bislang sehr smart zusammengestellt und stehen daher völlig zu Recht an der Spitze. Von den anderen Managern bin ich nicht enttäuscht, dafür ist die Saison noch viel zu jung. Wenn man überhaupt von einer kleinen Enttäuschung sprechen möchte, würde ich vielleicht Nik nennen. Er wurde von J.R. als echter Schwitzer angekündigt, konnte diesen Erwartungen bislang aber noch nicht ganz gerecht werden. Allerdings hat Nik bereits erklärt, dass ihm aktuell nur wenig Zeit zur Verfügung steht. Insofern ist das durchaus nachvollziehbar. Als meine größten Rivalen in der Liga sehe ich nach wie vor Ben und Janis. Daran haben auch die ersten drei Spieltage nichts geändert."
            },

            {
                question:
                    "Du gehörst laut Insidern der Liga zu einem der Favoriten auf den großen Champions-League-Titel. Spürst du diesen Druck oder gehst du ganz entspannt in die kommenden Wochen?",

                answer:
                    "Natürlich fühle ich mich geehrt, als einer der Favoriten auf den Champions-League-Titel gehandelt zu werden. Den damit verbundenen Druck spüre ich durchaus, aber ich kann damit umgehen. Das Gegenteil ist eigentlich der Fall. Ich liebe den Druck. Denn wie heißt es so schön: „Unter Druck entstehen Diamanten“. Ich sehe die Erwartungshaltung daher nicht als Belastung, sondern als zusätzliche Motivation. Letztlich müssen wir jetzt Woche für Woche liefern und zeigen, dass wir diesen Favoritenstatus auch verdient haben."
            }

        ]

    }

]

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