/*
=========================================
KICKBASE LEAGUE – KREISLIGA
AUTOMATISCHE TABELLE
MIT FORMKURVE
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startKreisligaPage();

    }
);


/*
=========================================
SEITE STARTEN
=========================================
*/

function startKreisligaPage() {

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


    renderKreisligaTable();

    renderKreisligaStatus();

    renderKreisligaSeason();

    refreshKreisligaIcons();

}


/*
=========================================
SAISON
=========================================
*/

function renderKreisligaSeason() {

    const seasonBadges =
        document.querySelectorAll(
            ".kreisliga-season-badge span"
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
KREISLIGA-MANAGER HOLEN
=========================================
*/

function getKreisligaManagers() {

    return leagueData.managers
        .filter(
            manager =>
                manager.mainRound.league ===
                "kreisliga"
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

function renderKreisligaTable() {

    const tbody =
        document.querySelector(
            ".kreisliga-table tbody"
        );


    if (!tbody) {
        return;
    }


    const managers =
        getKreisligaManagers();


    if (
        managers.length === 0
    ) {

        tbody.innerHTML =
            createEmptyKreisligaRows();

        refreshKreisligaIcons();

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
                        getKreisligaStatus(
                            position
                        );


                    return `
                        <tr class="${status.rowClass}">

                            <td>

                                <span class="
                                    kreisliga-position
                                    ${getKreisligaPositionClass(position)}
                                ">
                                    ${position}
                                </span>

                            </td>


                            <td>

                                <a
                                    class="kreisliga-manager-cell kreisliga-manager-link"
                                    href="/kickbase-league/manager-profil.html?id=${manager.id}"
                                >

                                    <span class="kreisliga-manager-avatar">

                                        <i
                                            data-lucide="user"
                                            aria-hidden="true"
                                        ></i>

                                    </span>

                                    <strong>
                                        ${escapeKreisligaHTML(
                                            manager.name
                                        )}
                                    </strong>

                                </a>

                            </td>


                            <td class="kreisliga-points-column">

                                <strong>
                                    ${formatKreisligaNumber(
                                        manager
                                            .mainRound
                                            .points
                                    )}
                                </strong>

                            </td>


                            <td class="kreisliga-form-column">

                                ${createKreisligaFormHTML(
                                    manager
                                )}

                            </td>


                            <td class="kreisliga-status-column">

                                <span class="
                                    kreisliga-status
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


    refreshKreisligaIcons();

}


/*
=========================================
LEERE TABELLE
VOR START DER KREISLIGA
=========================================
*/

function createEmptyKreisligaRows() {

    let rows = "";


    for (
        let position = 1;
        position <= 9;
        position++
    ) {

        const status =
            getKreisligaStatus(
                position
            );


        rows += `
            <tr class="${status.rowClass}">

                <td>

                    <span class="
                        kreisliga-position
                        ${getKreisligaPositionClass(position)}
                    ">
                        ${position}
                    </span>

                </td>


                <td>

                    <div class="kreisliga-manager-cell">

                        <span class="kreisliga-manager-avatar">

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


                <td class="kreisliga-points-column">

                    <strong>
                        0
                    </strong>

                </td>


                <td class="kreisliga-form-column">

                    ${createEmptyKreisligaForm()}

                </td>


                <td class="kreisliga-status-column">

                    <span class="
                        kreisliga-status
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
FORM DER LETZTEN 5 SPIELTAGE
=========================================
*/

function createKreisligaFormHTML(
    manager
) {

    const form =
        getKreisligaForm(
            manager
        );


    const slots = [

        ...Array(
            Math.max(
                0,
                5 - form.length
            )
        ).fill(null),

        ...form

    ];


    return `
        <div class="kreisliga-form">

            ${
                slots
                    .map(
                        position => {

                            if (
                                position === null
                            ) {

                                return `
                                    <span class="
                                        kreisliga-form-badge
                                        kreisliga-form-empty
                                    ">
                                        –
                                    </span>
                                `;

                            }


                            let formClass =
                                "kreisliga-form-mid";


                            if (
                                position <= 3
                            ) {

                                formClass =
                                    "kreisliga-form-good";

                            }

                            else if (
                                position >= 7
                            ) {

                                formClass =
                                    "kreisliga-form-bad";

                            }


                            return `
                                <span
                                    class="
                                        kreisliga-form-badge
                                        ${formClass}
                                    "
                                    title="Spieltagsplatz ${position}"
                                >
                                    ${position}
                                </span>
                            `;

                        }
                    )
                    .join("")
            }

        </div>
    `;

}


/*
=========================================
LEERE FORM
=========================================
*/

function createEmptyKreisligaForm() {

    return `
        <div class="kreisliga-form">

            <span class="kreisliga-form-badge kreisliga-form-empty">–</span>
            <span class="kreisliga-form-badge kreisliga-form-empty">–</span>
            <span class="kreisliga-form-badge kreisliga-form-empty">–</span>
            <span class="kreisliga-form-badge kreisliga-form-empty">–</span>
            <span class="kreisliga-form-badge kreisliga-form-empty">–</span>

        </div>
    `;

}


/*
=========================================
FORM BERECHNEN
=========================================
*/

function getKreisligaForm(
    manager
) {

    if (
        !Array.isArray(
            leagueData.mainRoundMatchdays
        )
    ) {

        return [];

    }


    const kreisligaManagers =
        leagueData.managers.filter(
            item =>
                item
                    .mainRound
                    .league ===
                "kreisliga"
        );


    const positions = [];


    leagueData
        .mainRoundMatchdays
        .forEach(
            matchday => {

                if (
                    !matchday ||
                    !matchday.scores
                ) {

                    return;

                }


                const results =
                    kreisligaManagers
                        .map(
                            leagueManager => {

                                const rawScore =
                                    matchday.scores[
                                        leagueManager.id
                                    ];


                                if (
                                    rawScore === undefined ||
                                    rawScore === null
                                ) {

                                    return null;

                                }


                                return {

                                    id:
                                        leagueManager.id,

                                    score:
                                        Number(rawScore)

                                };

                            }
                        )
                        .filter(Boolean)
                        .filter(
                            result =>
                                !Number.isNaN(
                                    result.score
                                )
                        );


                const hasRealScores =
                    results.some(
                        result =>
                            result.score > 0
                    );


                if (!hasRealScores) {
                    return;
                }


                const managerResult =
                    results.find(
                        result =>
                            result.id ===
                            manager.id
                    );


                if (!managerResult) {
                    return;
                }


                const position =
                    1 +
                    results.filter(
                        result =>
                            result.score >
                            managerResult.score
                    ).length;


                positions.push(
                    position
                );

            }
        );


    return positions.slice(-5);

}


/*
=========================================
STATUS JE PLATZ
=========================================
*/

function getKreisligaStatus(
    position
) {

    if (
        position === 1
    ) {

        return {

            label:
                "Meister",

            icon:
                "trophy",

            rowClass:
                "kreisliga-promotion-row",

            statusClass:
                "kreisliga-status-champion"

        };

    }


    if (
        position === 2 ||
        position === 3
    ) {

        return {

            label:
                "Aufstieg",

            icon:
                "arrow-up",

            rowClass:
                "kreisliga-promotion-row",

            statusClass:
                "kreisliga-status-promotion"

        };

    }


    return {

        label:
            "Ligaverbleib",

        icon:
            "shield-check",

        rowClass:
            "",

        statusClass:
            "kreisliga-status-stay"

    };

}


/*
=========================================
PLATZIERUNGS-KLASSE
=========================================
*/

function getKreisligaPositionClass(
    position
) {

    if (
        position === 1
    ) {

        return "kreisliga-position-first";

    }


    if (
        position === 2
    ) {

        return "kreisliga-position-second";

    }


    if (
        position === 3
    ) {

        return "kreisliga-position-third";

    }


    return "";

}


/*
=========================================
STATUS OBEN RECHTS
=========================================
*/

function renderKreisligaStatus() {

    const statusElement =
        document.querySelector(
            ".kreisliga-table-update span"
        );


    if (!statusElement) {
        return;
    }


    const managers =
        getKreisligaManagers();


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

function formatKreisligaNumber(
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

function escapeKreisligaHTML(
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

function refreshKreisligaIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}