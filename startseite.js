/*
=========================================
KICKBASE LEAGUE – STARTSEITE
DYNAMISCHE LIGA-ZENTRALE
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startLeagueDashboard();

    }
);


/*
=========================================
START
=========================================
*/

function startLeagueDashboard() {

    if (
        typeof leagueData === "undefined"
    ) {
        return;
    }


    if (
        typeof recalculateLeagueData ===
        "function"
    ) {

        recalculateLeagueData();

    }


    renderLeagueDashboard();

}


/*
=========================================
LIGA-ZENTRALE
=========================================
*/

function renderLeagueDashboard() {

    const container =
        document.getElementById(
            "league-live-grid"
        );


    if (!container) {
        return;
    }


    if (
        leagueData.phase ===
        "qualification"
    ) {

        renderQualificationDashboard(
            container
        );

        return;
    }


    renderMainRoundDashboard(
        container
    );

}


/*
=========================================
QUALIFIKATION
=========================================
*/

function renderQualificationDashboard(
    container
) {

    const leaderA =
        getQualificationLeader("A");


    const leaderB =
        getQualificationLeader("B");


    const latestBest =
        getLatestMatchdayBest();


    const highestRecord =
        leagueData.records
            .highestMatchdayScore;


    container.innerHTML = `

        ${createDashboardCard(
            "QUALIFIKATION A",
            leaderA
                ? leaderA.name
                : "Noch offen",
            leaderA
                ? `${formatDashboardNumber(
                    leaderA.qualification.points
                )} Punkte`
                : "Tabellenführer",
            "trophy",
            false,
            "/kickbase-league/qualifikationsligen.html"
        )}


        ${createDashboardCard(
            "QUALIFIKATION B",
            leaderB
                ? leaderB.name
                : "Noch offen",
            leaderB
                ? `${formatDashboardNumber(
                    leaderB.qualification.points
                )} Punkte`
                : "Tabellenführer",
            "trophy",
            false,
            "/kickbase-league/qualifikationsligen.html"
        )}


        ${createDashboardCard(
            "LETZTER SPIELTAG",
            latestBest
                ? latestBest.name
                : "Noch offen",
            latestBest
                ? `${formatDashboardNumber(
                    latestBest.score
                )} Punkte`
                : "Bester Manager",
            "flame",
            true,
            "/kickbase-league/qualifikationsligen.html"
        )}


        ${createDashboardCard(
            "SAISONBESTWERT",
            highestRecord &&
            highestRecord.managerId
                ? getDashboardManagerName(
                    highestRecord.managerId
                )
                : "Noch offen",
            highestRecord &&
            highestRecord.value > 0
                ? `${formatDashboardNumber(
                    highestRecord.value
                )} Punkte`
                : "Höchste Spieltagswertung",
            "zap",
            false,
            "/kickbase-league/statistiken.html"
        )}

    `;


    refreshDashboardIcons();

}


/*
=========================================
HAUPTPHASE
=========================================
*/

function renderMainRoundDashboard(
    container
) {

    const championsLeader =
        getMainRoundLeader(
            "champions-league"
        );


    const kreisligaLeader =
        getMainRoundLeader(
            "kreisliga"
        );


    const latestBest =
        getLatestMatchdayBest();


    const highestRecord =
        leagueData.records
            .highestMatchdayScore;


    container.innerHTML = `

        ${createDashboardCard(
            "CHAMPIONS LEAGUE",
            championsLeader
                ? championsLeader.name
                : "Noch offen",
            championsLeader
                ? `${formatDashboardNumber(
                    championsLeader.mainRound.points
                )} Punkte`
                : "Tabellenführer",
            "crown",
            false,
            "/kickbase-league/champions-league.html"
        )}


        ${createDashboardCard(
            "KREISLIGA",
            kreisligaLeader
                ? kreisligaLeader.name
                : "Noch offen",
            kreisligaLeader
                ? `${formatDashboardNumber(
                    kreisligaLeader.mainRound.points
                )} Punkte`
                : "Tabellenführer",
            "shield",
            false,
            "/kickbase-league/kreisliga.html"
        )}


        ${createDashboardCard(
            "LETZTER SPIELTAG",
            latestBest
                ? latestBest.name
                : "Noch offen",
            latestBest
                ? `${formatDashboardNumber(
                    latestBest.score
                )} Punkte`
                : "Bester Manager",
            "flame",
            true
        )}


        ${createDashboardCard(
            "SAISONBESTWERT",
            highestRecord &&
            highestRecord.managerId
                ? getDashboardManagerName(
                    highestRecord.managerId
                )
                : "Noch offen",
            highestRecord &&
            highestRecord.value > 0
                ? `${formatDashboardNumber(
                    highestRecord.value
                )} Punkte`
                : "Höchste Spieltagswertung",
            "zap",
            false,
            "/kickbase-league/statistiken.html"
        )}

    `;


    refreshDashboardIcons();

}


/*
=========================================
QUALIFIKATIONSFÜHRER
=========================================
*/

function getQualificationLeader(
    groupName
) {

    const managers =
        leagueData.managers
            .filter(
                manager =>
                    manager
                        .qualification
                        .group ===
                    groupName
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.qualification.points -
                    a.qualification.points
            );


    if (
        !managers.length ||
        managers[0]
            .qualification
            .points <= 0
    ) {

        return null;

    }


    return managers[0];

}


/*
=========================================
HAUPTPHASENFÜHRER
=========================================
*/

function getMainRoundLeader(
    leagueName
) {

    const managers =
        leagueData.managers
            .filter(
                manager =>
                    manager
                        .mainRound
                        .league ===
                    leagueName
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.mainRound.points -
                    a.mainRound.points
            );


    if (
        !managers.length ||
        managers[0]
            .mainRound
            .points <= 0
    ) {

        return null;

    }


    return managers[0];

}


/*
=========================================
BESTER DES LETZTEN SPIELTAGS
=========================================
*/

function getLatestMatchdayBest() {

    let latestScores =
        [];


    if (
        leagueData.phase ===
        "qualification"
    ) {

        const matchdays =
            leagueData
                .qualificationMatchdays;


        if (
            !Array.isArray(matchdays) ||
            !matchdays.length
        ) {

            return null;

        }


        const latestMatchday =
            matchdays[
                matchdays.length - 1
            ];


        if (
            !latestMatchday ||
            !latestMatchday.scores
        ) {

            return null;

        }


        latestScores =
            Object.entries(
                latestMatchday.scores
            );

    } else {

        const matchdays =
            leagueData
                .mainRoundMatchdays;


        if (
            !Array.isArray(matchdays) ||
            !matchdays.length
        ) {

            return null;

        }


        const latestMatchday =
            matchdays[
                matchdays.length - 1
            ];


        if (
            !latestMatchday ||
            !latestMatchday.scores
        ) {

            return null;

        }


        latestScores =
            Object.entries(
                latestMatchday.scores
            );

    }


    latestScores =
        latestScores.filter(
            (
                [
                    managerId,
                    score
                ]
            ) =>
                Number(score) > 0
        );


    if (
        !latestScores.length
    ) {

        return null;

    }


    latestScores.sort(
        (
            a,
            b
        ) =>
            Number(b[1]) -
            Number(a[1])
    );


    const [
        managerId,
        score
    ] =
        latestScores[0];


    return {

        id:
            managerId,

        name:
            getDashboardManagerName(
                managerId
            ),

        score:
            Number(score)

    };

}


/*
=========================================
KARTE ERZEUGEN
=========================================
*/

function createDashboardCard(
    label,
    name,
    detail,
    icon,
    highlight = false,
    link = null
) {

    const tag =
        link
            ? "a"
            : "article";


    const linkAttribute =
        link
            ? `href="${link}"`
            : "";


    return `

        <${tag}
            ${linkAttribute}
            class="
                league-live-card
                ${
                    highlight
                        ? "league-live-card-highlight"
                        : ""
                }
                ${
                    link
                        ? "league-live-card-link"
                        : ""
                }
            "
        >

            <span class="league-live-icon">

                <i
                    data-lucide="${icon}"
                ></i>

            </span>


            <div>

                <small>
                    ${label}
                </small>


                <strong>
                    ${name}
                </strong>


                <p>
                    ${detail}
                </p>

            </div>


            ${
                link
                    ? `
                        <span class="league-live-arrow">

                            <i
                                data-lucide="arrow-up-right"
                            ></i>

                        </span>
                    `
                    : ""
            }

        </${tag}>

    `;

}


/*
=========================================
MANAGERNAME
=========================================
*/

function getDashboardManagerName(
    managerId
) {

    const manager =
        leagueData.managers.find(
            item =>
                item.id ===
                managerId
        );


    return manager
        ? manager.name
        : "Noch offen";

}


/*
=========================================
ZAHL FORMATIEREN
=========================================
*/

function formatDashboardNumber(
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
ICONS
=========================================
*/

function refreshDashboardIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}