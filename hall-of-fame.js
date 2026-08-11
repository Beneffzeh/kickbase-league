/*
=========================================
KICKBASE LEAGUE – HALL OF FAME
AUTOMATISCHE VERSION
=========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        startHallOfFamePage();

    }
);


/*
=========================================
SEITE STARTEN
=========================================
*/

function startHallOfFamePage() {

    if (
        typeof leagueData === "undefined"
    ) {

        console.error(
            "league-data.js konnte nicht geladen werden."
        );

        return;

    }


    if (
        typeof recalculateLeagueData ===
        "function"
    ) {

        recalculateLeagueData();

    }


    renderHallOfFame();

    refreshHallOfFameIcons();

}


/*
=========================================
HALL OF FAME RENDERN
=========================================
*/

function renderHallOfFame() {

    const championsWinner =
        getChampionsLeagueWinner();


    const kreisligaWinner =
        getKreisligaWinner();


    const cupWinner =
        getCupWinner();


    renderWinnerCards(
        [
            createWinnerEntry(
                championsWinner
            )
        ],
        "championsleague-winners",
        "championsleague"
    );


    renderWinnerCards(
        [
            createWinnerEntry(
                kreisligaWinner
            )
        ],
        "kreisliga-winners",
        "kreisliga"
    );


    renderWinnerCards(
        [
            createWinnerEntry(
                cupWinner
            )
        ],
        "cup-winners",
        "cup"
    );

}


/*
=========================================
CHAMPIONS-LEAGUE-MEISTER
=========================================
*/

function getChampionsLeagueWinner() {

    const managers =
        leagueData.managers
            .filter(
                manager =>
                    manager
                        .mainRound
                        .league ===
                    "champions-league"
            )
            .sort(
                (
                    managerA,
                    managerB
                ) => {

                    return (
                        managerB
                            .mainRound
                            .points
                        -
                        managerA
                            .mainRound
                            .points
                    );

                }
            );


    if (
        leagueData.phase !== "finished" ||
        managers.length === 0
    ) {

        return null;

    }


    return managers[0];

}


/*
=========================================
KREISLIGA-MEISTER
=========================================
*/

function getKreisligaWinner() {

    const managers =
        leagueData.managers
            .filter(
                manager =>
                    manager
                        .mainRound
                        .league ===
                    "kreisliga"
            )
            .sort(
                (
                    managerA,
                    managerB
                ) => {

                    return (
                        managerB
                            .mainRound
                            .points
                        -
                        managerA
                            .mainRound
                            .points
                    );

                }
            );


    if (
        leagueData.phase !== "finished" ||
        managers.length === 0
    ) {

        return null;

    }


    return managers[0];

}


/*
=========================================
POKALSIEGER
=========================================
*/

function getCupWinner() {

    const winner =
        leagueData.managers.find(
            manager =>
                manager.cup.stage ===
                "winner"
        );


    return winner || null;

}


/*
=========================================
EINTRAG ERZEUGEN
=========================================
*/

function createWinnerEntry(
    manager
) {

    if (!manager) {

        return {

            season:
                leagueData.season,

            manager:
                "Noch offen",

            managerId:
                null,

            status:
                "pending"

        };

    }


    return {

        season:
            leagueData.season,

        manager:
            manager.name,

        managerId:
            manager.id,

        status:
            "winner"

    };

}


/*
=========================================
EHRENKARTEN ERSTELLEN
=========================================
*/

function renderWinnerCards(
    winners,
    containerId,
    competition
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        winners
            .map(
                (
                    winner,
                    index
                ) => {

                    const isPending =
                        winner.status ===
                        "pending";


                    const winnerNumber =
                        winners.length -
                        index;


                    const managerHTML =
                        winner.managerId

                            ? `
                                <a
                                    href="/kickbase-league/manager-profil.html?id=${winner.managerId}"
                                    class="hof-winner-manager-link"
                                >
                                    ${escapeHallOfFameHTML(
                                        winner.manager
                                    )}
                                </a>
                            `

                            : `
                                ${escapeHallOfFameHTML(
                                    winner.manager
                                )}
                            `;


                    return `
                        <article class="
                            hof-winner-card
                            ${competition}
                            ${
                                isPending
                                    ? "pending-winner"
                                    : ""
                            }
                        ">

                            <div class="hof-winner-card-glow"></div>


                            <div class="hof-season-badge">

                                SAISON
                                ${winner.season}

                            </div>


                            <div class="hof-medal">

                                <div class="hof-medal-ring">

                                    <div class="hof-medal-inner">

                                        <i
                                            data-lucide="${
                                                isPending
                                                    ? "hourglass"
                                                    : competition === "championsleague"
                                                        ? "crown"
                                                        : competition === "kreisliga"
                                                            ? "medal"
                                                            : "trophy"
                                            }"
                                        ></i>

                                    </div>

                                </div>

                            </div>


                            <div class="hof-winner-content">

                                <p class="hof-winner-category">

                                    ${
                                        competition ===
                                        "championsleague"

                                            ? "KICKBASE CHAMPION"

                                            : competition ===
                                              "kreisliga"

                                                ? "KREISLIGA-MEISTER"

                                                : "POKALSIEGER"
                                    }

                                </p>


                                <h3>
                                    ${managerHTML}
                                </h3>


                                <p class="hof-winner-description">

                                    ${
                                        isPending

                                            ? "Der Sieger wird nach Saisonende automatisch eingetragen."

                                            : "Offizielles Mitglied der Hall of Fame."
                                    }

                                </p>

                            </div>


                            <div class="hof-winner-footer">

                                <span>

                                    ${
                                        isPending

                                            ? "Ehrenplatz reserviert"

                                            : `Titelgewinn Nr. ${winnerNumber}`
                                    }

                                </span>


                                <i data-lucide="star"></i>

                            </div>

                        </article>
                    `;

                }
            )
            .join("");


    refreshHallOfFameIcons();

}


/*
=========================================
HTML ABSICHERN
=========================================
*/

function escapeHallOfFameHTML(
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
ICONS NEU LADEN
=========================================
*/

function refreshHallOfFameIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}