/*
=========================================
KICKBASE LEAGUE – CHAMPIONS LEAGUE
AUTOMATISCHE TABELLE
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startChampionsLeaguePage();

    }
);


/*
=========================================
SEITE STARTEN
=========================================
*/

function startChampionsLeaguePage() {

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


    renderChampionsLeagueTable();

    renderChampionsLeagueStatus();

    renderChampionsLeagueSeason();

    refreshChampionsLeagueIcons();

}


/*
=========================================
SAISON
=========================================
*/

function renderChampionsLeagueSeason() {

    const seasonBadges =
        document.querySelectorAll(
            ".cl-season-badge span"
        );


    seasonBadges.forEach(
        element => {

            element.textContent =
                `Saison ${leagueData.season}`;

        }
    );

}


/*
=========================================
CHAMPIONS-LEAGUE-MANAGER HOLEN
=========================================
*/

function getChampionsLeagueManagers() {

    return leagueData.managers
        .filter(
            manager =>
                manager.mainRound.league ===
                "champions-league"
        )
        .sort(
            (
                managerA,
                managerB
            ) => {

                const pointsDifference =
                    (
                        managerB
                            .mainRound
                            .points
                    )
                    -
                    (
                        managerA
                            .mainRound
                            .points
                    );


                if (
                    pointsDifference !== 0
                ) {

                    return pointsDifference;

                }


                const winsDifference =
                    (
                        managerB
                            .mainRound
                            .matchdayWins
                    )
                    -
                    (
                        managerA
                            .mainRound
                            .matchdayWins
                    );


                if (
                    winsDifference !== 0
                ) {

                    return winsDifference;

                }


                return managerA
                    .name
                    .localeCompare(
                        managerB.name,
                        "de"
                    );

            }
        );

}


/*
=========================================
TABELLE RENDERN
=========================================
*/

function renderChampionsLeagueTable() {

    const tbody =
        document.querySelector(
            ".cl-table tbody"
        );


    if (!tbody) {
        return;
    }


    const managers =
        getChampionsLeagueManagers();


    /*
    Noch keine Champions-League-Einteilung
    vorhanden.
    */

    if (
        managers.length === 0
    ) {

        tbody.innerHTML =
            createEmptyChampionsLeagueRows();

        refreshChampionsLeagueIcons();

        return;
    }


    tbody.innerHTML =
        managers
            .map(
                (
                    manager,
                    index
                ) => {

                    const position =
                        index + 1;


                    const status =
                        getChampionsLeagueStatus(
                            position
                        );


                    return `
                        <tr class="${status.rowClass}">

                            <td>

                                <span class="
                                    cl-position
                                    ${getPositionClass(position)}
                                ">
                                    ${position}
                                </span>

                            </td>


                            <td>

                                <a
    class="cl-manager-cell cl-manager-link"
    href="/kickbase-league/manager-profil.html?id=${manager.id}"
>

    <span class="cl-manager-avatar">

        <i
            data-lucide="user"
            aria-hidden="true"
        ></i>

    </span>

    <strong>
        ${escapeChampionsLeagueHTML(
            manager.name
        )}
    </strong>

</a>

                            </td>


                            <td class="cl-points-column">

                                <strong>
                                    ${formatChampionsLeagueNumber(
                                        manager
                                            .mainRound
                                            .points
                                    )}
                                </strong>

                            </td>


                            <td class="cl-status-column">

                                <span class="
                                    cl-status
                                    ${status.statusClass}
                                ">

                                    ${
                                        status.icon
                                            ? `
                                                <i
                                                    data-lucide="${status.icon}"
                                                    aria-hidden="true"
                                                ></i>
                                            `
                                            : ""
                                    }

                                    ${status.label}

                                </span>

                            </td>

                        </tr>
                    `;

                }
            )
            .join("");


    refreshChampionsLeagueIcons();

}


/*
=========================================
LEERE TABELLE
VOR START DER CHAMPIONS LEAGUE
=========================================
*/

function createEmptyChampionsLeagueRows() {

    let rows = "";


    for (
        let position = 1;
        position <= 9;
        position++
    ) {

        const status =
            getChampionsLeagueStatus(
                position
            );


        rows += `
            <tr class="${status.rowClass}">

                <td>

                    <span class="
                        cl-position
                        ${getPositionClass(position)}
                    ">
                        ${position}
                    </span>

                </td>


                <td>

                    <div class="cl-manager-cell">

                        <span class="cl-manager-avatar">

                            <i
                                data-lucide="user"
                                aria-hidden="true"
                            ></i>

                        </span>

                        <strong>
                            Noch offen
                        </strong>

                    </div>

                </td>


                <td class="cl-points-column">

                    <strong>
                        0
                    </strong>

                </td>


                <td class="cl-status-column">

                    <span class="
                        cl-status
                        ${status.statusClass}
                    ">

                        ${
                            status.icon
                                ? `
                                    <i
                                        data-lucide="${status.icon}"
                                        aria-hidden="true"
                                    ></i>
                                `
                                : ""
                        }

                        ${status.label}

                    </span>

                </td>

            </tr>
        `;

    }


    return rows;

}


/*
=========================================
STATUS JE PLATZ
=========================================
*/

function getChampionsLeagueStatus(
    position
) {

    if (
        position === 1
    ) {

        return {

            label:
                "Champion",

            icon:
                "trophy",

            rowClass:
                "cl-champion-row",

            statusClass:
                "cl-status-champion"

        };

    }


    if (
        position === 2
    ) {

        return {

            label:
                "Silber",

            icon:
                null,

            rowClass:
                "",

            statusClass:
                "cl-status-silver"

        };

    }


    if (
        position === 3
    ) {

        return {

            label:
                "Bronze",

            icon:
                null,

            rowClass:
                "",

            statusClass:
                "cl-status-bronze"

        };

    }


    if (
        position >= 4 &&
        position <= 6
    ) {

        return {

            label:
                "Klassenerhalt",

            icon:
                "shield-check",

            rowClass:
                "",

            statusClass:
                "cl-status-safe"

        };

    }


    return {

        label:
            "Abstieg",

        icon:
            "arrow-down",

        rowClass:
            "cl-relegation-row",

        statusClass:
            "cl-status-relegation"

    };

}


/*
=========================================
PLATZIERUNGS-KLASSE
=========================================
*/

function getPositionClass(
    position
) {

    if (
        position === 1
    ) {

        return "cl-position-first";

    }


    if (
        position === 2
    ) {

        return "cl-position-second";

    }


    if (
        position === 3
    ) {

        return "cl-position-third";

    }


    return "";

}


/*
=========================================
STATUS OBEN RECHTS
=========================================
*/

function renderChampionsLeagueStatus() {

    const statusElement =
        document.querySelector(
            ".cl-table-update span"
        );


    if (!statusElement) {
        return;
    }


    const managers =
        getChampionsLeagueManagers();


    /*
    Qualifikation noch nicht beendet.
    */

    if (
        managers.length === 0
    ) {

        statusElement.textContent =
            "Noch nicht gestartet";

        return;
    }


    const matchday =
        getCurrentMainRoundMatchday();


    if (
        matchday === 0
    ) {

        statusElement.textContent =
            "Teilnehmer stehen fest";

        return;
    }


    if (
        matchday < 20
    ) {

        statusElement.textContent =
            `${matchday}. Spieltag`;

        return;
    }


    statusElement.textContent =
        "Saison abgeschlossen";

}


/*
=========================================
ZAHL FORMATIEREN
=========================================
*/

function formatChampionsLeagueNumber(
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

function escapeChampionsLeagueHTML(
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

function refreshChampionsLeagueIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}