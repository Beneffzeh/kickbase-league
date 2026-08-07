/*
=========================================
KICKBASE LEAGUE – MANAGERÜBERSICHT
AUTOMATISCHE VERSION
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startManagerOverview();

    }
);


/*
=========================================
SEITE STARTEN
=========================================
*/

function startManagerOverview() {

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


    renderManagerOverview();

    refreshManagerIcons();

}


/*
=========================================
ALLE MANAGER RENDERN
=========================================
*/

function renderManagerOverview() {

    const grid =
        document.getElementById(
            "manager-grid"
        );


    if (!grid) {
        return;
    }


    const managers =
        [...leagueData.managers]
            .sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name,
                        "de"
                    )
            );


    grid.innerHTML =
        managers
            .map(
                (
                    manager,
                    index
                ) =>
                    createManagerCard(
                        manager,
                        index
                    )
            )
            .join("");


    refreshManagerIcons();

}


/*
=========================================
MANAGERKARTE
=========================================
*/

function createManagerCard(
    manager,
    index
) {

    const currentLeague =
        getManagerCurrentLeague(
            manager
        );


    const leagueClass =
        getManagerLeagueClass(
            currentLeague
        );


    const currentPoints =
        getManagerCurrentPoints(
            manager
        );


    const currentWins =
        getManagerCurrentWins(
            manager
        );


    const currentPosition =
        getManagerCurrentPosition(
            manager
        );


    const legendPoints =
        typeof calculateLegendPoints ===
            "function"
                ? calculateLegendPoints(
                    manager
                )
                : 0;


    const legendRank =
        typeof getLegendRank ===
            "function"
                ? getLegendRank(
                    legendPoints
                )
                : {
                    name: "Rookie",
                    icon: "circle-user-round",
                    className: "rank-rookie"
                };


    const rankingNumber =
        String(
            index + 1
        ).padStart(
            2,
            "0"
        );


    const initials =
        getManagerInitials(
            manager.name
        );


    return `

        <a
            class="
                manager-card
                ${legendRank.className}
            "
            href="/kickbase-league/manager-profil.html?id=${manager.id}"
        >

            <div class="manager-card-topline"></div>


            <div class="manager-card-header">

                <div class="manager-card-identity">

                    <span class="manager-avatar">
                        ${initials}
                    </span>


                    <div>

                        <span class="manager-number">
                            MANAGER ${rankingNumber}
                        </span>

                        <h3>
                            ${escapeManagerHTML(
                                manager.name
                            )}
                        </h3>

                    </div>

                </div>


                <span class="
                    manager-current-league
                    ${leagueClass}
                ">

                    <i data-lucide="map-pin"></i>

                    ${currentLeague}

                </span>

            </div>


            <div class="manager-title-badges">

                <span class="
                    manager-title-badge
                    ${legendRank.className}
                ">

                    <i
                        data-lucide="${legendRank.icon}"
                    ></i>

                    ${legendRank.name}

                </span>


                <span class="
                    manager-title-badge
                    manager-title-badge-empty
                ">

                    <i data-lucide="sparkles"></i>

                    ${legendPoints} LP

                </span>

            </div>


            <div class="manager-card-divider"></div>


            <div class="manager-statistics-grid">

                <div class="manager-statistic">

                    <span class="manager-statistic-icon">

                        <i data-lucide="chart-no-axes-column-increasing"></i>

                    </span>

                    <div>

                        <small>
                            Aktuelle Punkte
                        </small>

                        <strong>
                            ${formatManagerNumber(
                                currentPoints
                            )}
                        </strong>

                    </div>

                </div>


                <div class="
                    manager-statistic
                    manager-statistic-promotion
                ">

                    <span class="manager-statistic-icon">

                        <i data-lucide="star"></i>

                    </span>

                    <div>

                        <small>
                            Spieltagssiege
                        </small>

                        <strong>
                            ${currentWins}
                        </strong>

                    </div>

                </div>


                <div class="
                    manager-statistic
                    manager-statistic-relegation
                ">

                    <span class="manager-statistic-icon">

                        <i data-lucide="list-ordered"></i>

                    </span>

                    <div>

                        <small>
                            Tabellenplatz
                        </small>

                        <strong>
                            ${
                                currentPosition
                                    ? `${currentPosition}.`
                                    : "–"
                            }
                        </strong>

                    </div>

                </div>


                <div class="
                    manager-statistic
                    manager-statistic-cup
                ">

                    <span class="manager-statistic-icon">

                        <i data-lucide="trophy"></i>

                    </span>

                    <div>

                        <small>
                            Pokal
                        </small>

                        <strong>
                            ${getManagerCupStage(
                                manager
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="manager-best-position">

                <div class="manager-best-position-icon">

                    <i data-lucide="shield-star"></i>

                </div>


                <div>

                    <span>
                        LEGENDENRANG
                    </span>

                    <strong>
                        ${legendRank.name}
                    </strong>

                    <p>
                        ${legendPoints} Legendenpunkte
                    </p>

                </div>

            </div>

        </a>

    `;

}


/*
=========================================
AKTUELLE LIGA
=========================================
*/

function getManagerCurrentLeague(
    manager
) {

    if (
        manager.mainRound.league ===
        "champions-league"
    ) {

        return "Champions League";

    }


    if (
        manager.mainRound.league ===
        "kreisliga"
    ) {

        return "Kreisliga";

    }


    if (
        manager.qualification.group
    ) {

        return (
            "Qualifikation " +
            manager.qualification.group
        );

    }


    return "Noch offen";

}


/*
=========================================
LIGA-KLASSE
=========================================
*/

function getManagerLeagueClass(
    league
) {

    if (
        league ===
        "Champions League"
    ) {

        return "manager-league-champions";

    }


    if (
        league ===
        "Kreisliga"
    ) {

        return "manager-league-kreisliga";

    }


    if (
        league ===
        "Qualifikation A"
    ) {

        return "manager-league-quali-a";

    }


    if (
        league ===
        "Qualifikation B"
    ) {

        return "manager-league-quali-b";

    }


    return "manager-league-neutral";

}


/*
=========================================
AKTUELLE PUNKTE
=========================================
*/

function getManagerCurrentPoints(
    manager
) {

    if (
        manager.mainRound.league
    ) {

        return (
            manager.mainRound.points || 0
        );

    }


    return (
        manager.qualification.points || 0
    );

}


/*
=========================================
SPIELTAGSSIEGE
=========================================
*/

function getManagerCurrentWins(
    manager
) {

    if (
        manager.mainRound.league
    ) {

        return (
            manager
                .mainRound
                .matchdayWins || 0
        );

    }


    return (
        manager
            .qualification
            .matchdayWins || 0
    );

}


/*
=========================================
TABELLENPLATZ
=========================================
*/

function getManagerCurrentPosition(
    manager
) {

    if (
        manager.mainRound.league
    ) {

        return (
            manager
                .mainRound
                .currentPosition ||
            null
        );

    }


    return (
        manager
            .qualification
            .currentPosition ||
        null
    );

}


/*
=========================================
POKALRUNDE
=========================================
*/

function getManagerCupStage(
    manager
) {

    const stages = {

        "preliminary-round":
            "Vorrunde",

        "round-of-16":
            "Achtelfinale",

        "quarter-final":
            "Viertelfinale",

        "semi-final":
            "Halbfinale",

        "final":
            "Finale",

        "winner":
            "Pokalsieger"

    };


    return (
        stages[
            manager.cup.stage
        ] ||
        "Noch offen"
    );

}


/*
=========================================
INITIALEN
=========================================
*/

function getManagerInitials(
    name
) {

    return String(name)

        .split(" ")

        .map(
            part =>
                part.charAt(0)
        )

        .join("")

        .substring(
            0,
            2
        )

        .toUpperCase();

}


/*
=========================================
ZAHLEN
=========================================
*/

function formatManagerNumber(
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

function escapeManagerHTML(
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


/*
=========================================
ICONS
=========================================
*/

function refreshManagerIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}