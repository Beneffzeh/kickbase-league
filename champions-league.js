/*
=========================================
KICKBASE LEAGUE – CHAMPIONS LEAGUE
AUTOMATISCHE TABELLE
MIT FORMKURVE + SAISONPROGNOSE
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

    renderChampionsLeaguePrediction();

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
        document.getElementById(
            "cl-table-body"
        )
        ||
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
                                    class="
                                        cl-manager-cell
                                        cl-manager-link
                                    "
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


                            <td class="cl-form-column">

                                ${createChampionsLeagueFormHTML(
                                    manager
                                )}

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


                <td class="cl-form-column">

                    ${createEmptyChampionsLeagueForm()}

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
FORM DER LETZTEN 5 SPIELTAGE
=========================================
*/


function createChampionsLeagueFormHTML(
    manager
) {

    const form =
        getChampionsLeagueForm(
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

        <div class="cl-form">

            ${
                slots
                    .map(
                        position => {

                            if (
                                position === null
                            ) {

                                return `

                                    <span class="
                                        cl-form-badge
                                        cl-form-empty
                                    ">
                                        –
                                    </span>

                                `;

                            }


                            let formClass =
                                "cl-form-mid";


                            if (
                                position <= 3
                            ) {

                                formClass =
                                    "cl-form-good";

                            }

                            else if (
                                position >= 7
                            ) {

                                formClass =
                                    "cl-form-bad";

                            }


                            return `

                                <span
                                    class="
                                        cl-form-badge
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


function createEmptyChampionsLeagueForm() {

    return `

        <div class="cl-form">

            <span class="cl-form-badge cl-form-empty">–</span>
            <span class="cl-form-badge cl-form-empty">–</span>
            <span class="cl-form-badge cl-form-empty">–</span>
            <span class="cl-form-badge cl-form-empty">–</span>
            <span class="cl-form-badge cl-form-empty">–</span>

        </div>

    `;

}


/*
=========================================
FORM BERECHNEN
=========================================
*/


function getChampionsLeagueForm(
    manager
) {

    if (
        !Array.isArray(
            leagueData.mainRoundMatchdays
        )
    ) {

        return [];

    }


    const championsManagers =
        leagueData.managers.filter(
            item =>
                item
                    .mainRound
                    .league ===
                "champions-league"
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
                    championsManagers
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


                /*
                Noch nicht gespielte
                0-Punkte-Spieltage ignorieren.
                */

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


                /*
                Platz = Anzahl der Manager
                mit besserer Punktzahl + 1.
                */

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


    if (
        managers.length === 0
    ) {

        statusElement.textContent =
            "Noch nicht gestartet";

        return;

    }


    const matchday =
        typeof getCurrentMainRoundMatchday ===
            "function"
            ?
            getCurrentMainRoundMatchday()
            :
            0;


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
CHAMPIONS-LEAGUE-PROGNOSE
=========================================
*/


function renderChampionsLeaguePrediction() {

    const predictionBody =
        document.getElementById(
            "cl-prediction-table-body"
        );


    if (!predictionBody) {
        return;
    }


    /*
    Prüfen, ob die neue Prognose-Engine
    verfügbar ist.
    */

    if (
        typeof calculatePowerBasedMainRoundPrediction !==
            "function"
    ) {

        renderChampionsLeaguePredictionError(
            "Prognose konnte nicht geladen werden."
        );

        return;

    }


    const managers =
        getChampionsLeagueManagers();


    /*
    Während der Qualifikation stehen
    noch keine 9 CL-Teilnehmer fest.
    */

    if (
        managers.length !== 9
    ) {

        renderChampionsLeaguePredictionWaiting();

        return;

    }


    /*
    WICHTIG:

    Die 10.000 Simulationen werden
    genau EINMAL durchgeführt.

    Danach verwenden Tabelle und
    Highlight-Karten dasselbe Ergebnis.
    */

    const prediction =
        calculatePowerBasedMainRoundPrediction(
            "champions-league"
        );


    if (!prediction) {

        renderChampionsLeaguePredictionError(
            "Die Saisonprognose konnte noch nicht berechnet werden."
        );

        return;

    }


    const ranking =
        Object.values(
            prediction
        )
        .sort(
            (
                managerA,
                managerB
            ) => {

                /*
                Höhere Meisterchance zuerst.
                */

                if (
                    managerB
                        .championProbability
                    !==
                    managerA
                        .championProbability
                ) {

                    return (
                        managerB
                            .championProbability
                        -
                        managerA
                            .championProbability
                    );

                }


                /*
                Danach besserer erwarteter
                Endplatz.
                */

                return (
                    managerA
                        .averageFinalPosition
                    -
                    managerB
                        .averageFinalPosition
                );

            }
        );


    renderChampionsLeaguePredictionHighlights(
        ranking
    );


    predictionBody.innerHTML =
        ranking
            .map(
                (
                    manager,
                    index
                ) =>
                    createChampionsLeaguePredictionRow(
                        manager,
                        index + 1
                    )
            )
            .join("");


    refreshChampionsLeagueIcons();

}


/*
=========================================
PROGNOSE-HIGHLIGHTS
=========================================
*/


function renderChampionsLeaguePredictionHighlights(
    ranking
) {

    if (
        !Array.isArray(ranking) ||
        ranking.length === 0
    ) {

        return;

    }


    /*
    =====================================
    TITELFAVORIT
    =====================================
    */


    const titleFavorite =
        [...ranking]
            .sort(
                (
                    managerA,
                    managerB
                ) =>
                    managerB
                        .championProbability
                    -
                    managerA
                        .championProbability
            )[0];


    setChampionsLeaguePredictionText(
        "cl-prediction-favorite",
        titleFavorite.name
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-favorite-value",
        `${formatChampionsLeaguePredictionPercentage(
            titleFavorite
                .championProbability
        )} Meisterchance`
    );


    /*
    =====================================
    STÄRKSTES POWER RATING
    =====================================
    */


    const strongestPower =
        [...ranking]
            .sort(
                (
                    managerA,
                    managerB
                ) =>
                    managerB
                        .powerRating
                    -
                    managerA
                        .powerRating
            )[0];


    setChampionsLeaguePredictionText(
        "cl-prediction-power",
        strongestPower.name
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-power-value",
        `Power ${formatChampionsLeaguePower(
            strongestPower.powerRating
        )}`
    );


    /*
    =====================================
    HÖCHSTE ABSTIEGSGEFAHR
    =====================================
    */


    const dangerManager =
        [...ranking]
            .sort(
                (
                    managerA,
                    managerB
                ) =>
                    managerB
                        .relegationProbability
                    -
                    managerA
                        .relegationProbability
            )[0];


    setChampionsLeaguePredictionText(
        "cl-prediction-danger",
        dangerManager.name
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-danger-value",
        `${formatChampionsLeaguePredictionPercentage(
            dangerManager
                .relegationProbability
        )} Abstiegsrisiko`
    );

}


/*
=========================================
EINE PROGNOSEZEILE
=========================================
*/


function createChampionsLeaguePredictionRow(
    manager,
    predictionPosition
) {

    const championProbability =
        Number(
            manager
                .championProbability
        ) || 0;


    const topThreeProbability =
        Number(
            manager
                .topThreeProbability
        ) || 0;


    const survivalProbability =
        Number(
            manager
                .survivalProbability
        ) || 0;


    const relegationProbability =
        Number(
            manager
                .relegationProbability
        ) || 0;


    const powerRating =
        Number(
            manager
                .powerRating
        ) || 50;


    const averagePosition =
        Number(
            manager
                .averageFinalPosition
        ) || 0;


    return `

        <tr>

            <td>

                <span class="
                    cl-prediction-position
                    ${getChampionsLeaguePredictionPositionClass(
                        predictionPosition
                    )}
                ">
                    ${predictionPosition}
                </span>

            </td>


            <td>

                <a
                    class="cl-prediction-manager"
                    href="/kickbase-league/manager-profil.html?id=${encodeURIComponent(
                        manager.managerId
                    )}"
                >

                    <span class="cl-prediction-manager-avatar">

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


            <td>

                <span class="
                    cl-prediction-power
                    ${getChampionsLeaguePowerClass(
                        powerRating
                    )}
                ">
                    ${formatChampionsLeaguePower(
                        powerRating
                    )}
                </span>

            </td>


            <td>

                <strong class="cl-prediction-title-value">

                    ${formatChampionsLeaguePredictionPercentage(
                        championProbability
                    )}

                </strong>

            </td>


            <td>

                <span class="cl-prediction-top-three-value">

                    ${formatChampionsLeaguePredictionPercentage(
                        topThreeProbability
                    )}

                </span>

            </td>


            <td>

                <span class="cl-prediction-survival-value">

                    ${formatChampionsLeaguePredictionPercentage(
                        survivalProbability
                    )}

                </span>

            </td>


            <td>

                <span class="cl-prediction-relegation-value">

                    ${formatChampionsLeaguePredictionPercentage(
                        relegationProbability
                    )}

                </span>

            </td>


            <td>

                <strong class="cl-prediction-average-position">

                    ${formatChampionsLeaguePredictionPosition(
                        averagePosition
                    )}

                </strong>

            </td>

        </tr>

    `;

}


/*
=========================================
PROGNOSEPOSITION DESIGN
=========================================
*/


function getChampionsLeaguePredictionPositionClass(
    position
) {

    if (
        position === 1
    ) {

        return "cl-prediction-position-first";

    }


    if (
        position === 2
    ) {

        return "cl-prediction-position-second";

    }


    if (
        position === 3
    ) {

        return "cl-prediction-position-third";

    }


    return "";

}


/*
=========================================
POWER-RATING DESIGN
=========================================
*/


function getChampionsLeaguePowerClass(
    rating
) {

    if (
        rating >= 80
    ) {

        return "cl-prediction-power-elite";

    }


    if (
        rating >= 65
    ) {

        return "cl-prediction-power-strong";

    }


    if (
        rating >= 50
    ) {

        return "cl-prediction-power-normal";

    }


    return "cl-prediction-power-low";

}


/*
=========================================
PROGNOSE WARTET AUF QUALIFIKATION
=========================================
*/


function renderChampionsLeaguePredictionWaiting() {

    const body =
        document.getElementById(
            "cl-prediction-table-body"
        );


    if (body) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="cl-prediction-empty"
                >

                    <div class="cl-prediction-empty-content">

                        <i
                            data-lucide="hourglass"
                            aria-hidden="true"
                        ></i>

                        <strong>
                            Prognose startet nach der Qualifikation
                        </strong>

                        <p>
                            Sobald die neun Champions-League-Manager
                            feststehen, werden die ersten
                            10.000 Saisonverläufe automatisch simuliert.
                        </p>

                    </div>

                </td>

            </tr>

        `;

    }


    setChampionsLeaguePredictionText(
        "cl-prediction-favorite",
        "Noch offen"
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-favorite-value",
        "Nach Abschluss der Qualifikation"
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-power",
        "Noch offen"
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-power-value",
        "Power Rating folgt"
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-danger",
        "Noch offen"
    );


    setChampionsLeaguePredictionText(
        "cl-prediction-danger-value",
        "Nach Abschluss der Qualifikation"
    );


    refreshChampionsLeagueIcons();

}


/*
=========================================
PROGNOSEFEHLER
=========================================
*/


function renderChampionsLeaguePredictionError(
    message
) {

    const body =
        document.getElementById(
            "cl-prediction-table-body"
        );


    if (!body) {
        return;
    }


    body.innerHTML = `

        <tr>

            <td
                colspan="8"
                class="cl-prediction-empty"
            >

                <div class="cl-prediction-empty-content">

                    <i
                        data-lucide="triangle-alert"
                        aria-hidden="true"
                    ></i>

                    <strong>
                        Prognose nicht verfügbar
                    </strong>

                    <p>
                        ${escapeChampionsLeagueHTML(
                            message
                        )}
                    </p>

                </div>

            </td>

        </tr>

    `;


    refreshChampionsLeagueIcons();

}


/*
=========================================
PROGNOSETEXT SETZEN
=========================================
*/


function setChampionsLeaguePredictionText(
    elementId,
    text
) {

    const element =
        document.getElementById(
            elementId
        );


    if (
        element
    ) {

        element.textContent =
            text;

    }

}


/*
=========================================
PROZENT FORMATIEREN
=========================================
*/


function formatChampionsLeaguePredictionPercentage(
    value
) {

    return (
        Number(value)
            .toLocaleString(
                "de-DE",
                {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }
            )
        +
        " %"
    );

}


/*
=========================================
POWER FORMATIEREN
=========================================
*/


function formatChampionsLeaguePower(
    value
) {

    return Number(value)
        .toLocaleString(
            "de-DE",
            {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
            }
        );

}


/*
=========================================
PROGNOSEPLATZ FORMATIEREN
=========================================
*/


function formatChampionsLeaguePredictionPosition(
    value
) {

    return (
        Number(value)
            .toLocaleString(
                "de-DE",
                {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2
                }
            )
        +
        "."
    );

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