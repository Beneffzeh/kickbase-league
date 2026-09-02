/*
=========================================
KICKBASE LEAGUE – LEGENDENSEITE
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startLegendsPage();

    }
);



function startLegendsPage() {

    if (
        typeof leagueData ===
            "undefined" ||
        typeof createLegendRanking !==
            "function"
    ) {

        console.error(
            "Die Ligadaten oder die Legendenberechnung konnten nicht geladen werden."
        );


        showLegendsError();

        return;

    }


    const ranking =
        createLegendRanking();


    renderLegendCards(
        ranking
    );


    renderLegendSummary(
        ranking
    );


    renderSeason();


    refreshLucideIcons();

}



/*
=========================================
MANAGERKARTEN
=========================================
*/

function renderLegendCards(
    ranking
) {

    const container =

        document.getElementById(
            "legends-ranking-cards"
        );


    if (!container) {

        console.error(
            'Das Element mit der ID "legends-ranking-cards" fehlt.'
        );

        return;

    }


    container.innerHTML = "";


    ranking.forEach(
        (manager, index) => {


            const position =
                index + 1;


            const card =
                document.createElement(
                    "article"
                );


            card.className = [

                "legend-card",

                getPositionCardClass(
                    position
                ),

                manager.legendRank.className

            ]
                .filter(Boolean)
                .join(" ");


            card.innerHTML =

                createLegendCardHTML(
                    manager,
                    position
                );


            container.appendChild(
                card
            );

        }
    );


    activateLegendBreakdowns();


    refreshLucideIcons();

}



/*
=========================================
HTML EINER LEGENDENKARTE
=========================================
*/

function createLegendCardHTML(
    manager,
    position
) {

    const award =

        getPrimaryAward(
            manager,
            position
        );


    return `

        <div class="legend-card-glow"></div>


        <div class="legend-card-top">

            <span class="
                legend-card-position
                ${getPositionBadgeClass(
                    position
                )}
            ">

                ${position}

            </span>


            <span class="legend-card-position-label">

                Platz ${position}

            </span>

        </div>


        <div class="legend-card-emblem">

            <div class="legend-card-emblem-ring">

                <i
                    data-lucide="${manager.legendRank.icon}"
                    aria-hidden="true"
                ></i>

            </div>

        </div>


        <div class="legend-card-main">

            <p class="legend-card-category">

                MANAGER

            </p>


            <h3 class="legend-card-name">

                ${escapeHTML(
                    manager.name
                )}

            </h3>


            <div class="
                legend-card-rank
                ${manager.legendRank.className}
            ">

                <i
                    data-lucide="${manager.legendRank.icon}"
                    aria-hidden="true"
                ></i>


                <span>

                    ${escapeHTML(
                        manager.legendRank.name
                    )}

                </span>

            </div>

        </div>


        <div class="legend-card-score">

            <strong>

                ${manager.legendPoints}

            </strong>


            <span>

                Legendenpunkte

            </span>

        </div>


        <div class="legend-card-meta">

            <span>

                <i
                    data-lucide="shield"
                    aria-hidden="true"
                ></i>

                ${escapeHTML(
                    getManagerLeagueLabel(
                        manager
                    )
                )}

            </span>


            <span>

                <i
                    data-lucide="chart-no-axes-column"
                    aria-hidden="true"
                ></i>

                ${escapeHTML(
                    getManagerPositionLabel(
                        manager
                    )
                )}

            </span>

        </div>


        ${
            award

                ? `

                    <div class="
                        legend-card-award
                        ${award.className}
                    ">

                        <i
                            data-lucide="${award.icon}"
                            aria-hidden="true"
                        ></i>


                        <span>

                            ${escapeHTML(
                                award.text
                            )}

                        </span>

                    </div>

                `

                : ""

        }


        ${createLegendBreakdownHTML(
            manager
        )}


        <div class="legend-card-footer">

            <a
                href="/kickbase-league/manager-profil.html?id=${encodeURIComponent(
                    manager.id
                )}"
                class="legend-profile-link"
                aria-label="Managerprofil von ${escapeHTML(
                    manager.name
                )} öffnen"
            >

                <span>

                    Profil öffnen

                </span>


                <i
                    data-lucide="chevron-right"
                    aria-hidden="true"
                ></i>

            </a>

        </div>

    `;

}



/*
=========================================
DETAILLIERTE LP-AUFSCHLÜSSELUNG
=========================================
*/

function createLegendBreakdownHTML(
    manager
) {

    const breakdown =

        manager.legendBreakdown || [];


    const panelId =

        `legend-breakdown-${String(
            manager.id
        )
            .replaceAll(" ", "-")
            .replaceAll("/", "-")}`;


    if (!breakdown.length) {

        return `

            <div class="legend-breakdown-wrapper">

                <button
                    class="legend-breakdown-toggle"
                    type="button"
                    aria-expanded="false"
                    aria-controls="${panelId}"
                >

                    <span class="legend-breakdown-toggle-left">

                        <i
                            data-lucide="list-tree"
                            aria-hidden="true"
                        ></i>


                        <span>

                            LP-Aufschlüsselung

                        </span>

                    </span>


                    <span class="legend-breakdown-toggle-right">

                        <strong>

                            0 LP

                        </strong>


                        <i
                            class="legend-breakdown-chevron"
                            data-lucide="chevron-down"
                            aria-hidden="true"
                        ></i>

                    </span>

                </button>


                <div
                    class="legend-breakdown-panel"
                    id="${panelId}"
                    hidden
                >

                    <div class="legend-breakdown-empty">

                        <i
                            data-lucide="circle-minus"
                            aria-hidden="true"
                        ></i>


                        <div>

                            <strong>

                                Noch keine Legendenpunkte

                            </strong>


                            <span>

                                Dieser Manager hat aktuell noch keine LP gesammelt.

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        `;

    }


    const groupedSections =

        groupLegendBreakdown(
            breakdown
        );


    const sectionHTML =

        groupedSections
            .map(section => {

                const items =

                    section.items
                        .map(item => {

                            return createLegendBreakdownItemHTML(
                                item
                            );

                        })
                        .join("");


                return `

                    <div class="legend-breakdown-section">

                        <div class="legend-breakdown-section-title">

                            <span>

                                ${escapeHTML(
                                    section.name
                                )}

                            </span>

                        </div>


                        <div class="legend-breakdown-list">

                            ${items}

                        </div>

                    </div>

                `;

            })
            .join("");


    return `

        <div class="legend-breakdown-wrapper">

            <button
                class="legend-breakdown-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="${panelId}"
            >

                <span class="legend-breakdown-toggle-left">

                    <i
                        data-lucide="list-tree"
                        aria-hidden="true"
                    ></i>


                    <span>

                        LP-Aufschlüsselung

                    </span>

                </span>


                <span class="legend-breakdown-toggle-right">

                    <strong>

                        ${manager.legendPoints} LP

                    </strong>


                    <i
                        class="legend-breakdown-chevron"
                        data-lucide="chevron-down"
                        aria-hidden="true"
                    ></i>

                </span>

            </button>


            <div
                class="legend-breakdown-panel"
                id="${panelId}"
                hidden
            >

                ${sectionHTML}


                <div class="legend-breakdown-grand-total">

                    <div>

                        <span>

                            Legendenpunkte gesamt

                        </span>


                        <small>

                            Aktueller Stand

                        </small>

                    </div>


                    <strong>

                        ${manager.legendPoints} LP

                    </strong>

                </div>

            </div>

        </div>

    `;

}



/*
=========================================
EINZELNE LP-POSITION
=========================================
*/

function createLegendBreakdownItemHTML(
    item
) {

    const pointsHTML =

        item.points !== null &&
        item.points !== undefined

            ? `

                <span class="
                    legend-breakdown-points
                    ${
                        item.total
                            ? "legend-breakdown-points-total"
                            : ""
                    }
                ">

                    +${item.points} LP

                </span>

            `

            : `

                <span class="legend-breakdown-base">

                    Basis

                </span>

            `;


    return `

        <div class="
            legend-breakdown-item
            ${
                item.total
                    ? "legend-breakdown-item-total"
                    : ""
            }
        ">

            <div class="legend-breakdown-item-icon">

                <i
                    data-lucide="${item.icon}"
                    aria-hidden="true"
                ></i>

            </div>


            <div class="legend-breakdown-item-content">

                <strong>

                    ${escapeHTML(
                        item.title
                    )}

                </strong>


                <span>

                    ${escapeHTML(
                        item.detail
                    )}

                </span>

            </div>


            ${pointsHTML}

        </div>

    `;

}



/*
=========================================
AUFSCHLÜSSELUNG GRUPPIEREN
=========================================
*/

function groupLegendBreakdown(
    breakdown
) {

    const sections =
        [];


    const sectionMap =
        new Map();


    breakdown.forEach(
        item => {


            const sectionName =

                item.section ||
                "Sonstiges";


            if (
                !sectionMap.has(
                    sectionName
                )
            ) {

                const section = {

                    name:
                        sectionName,

                    items:
                        []

                };


                sectionMap.set(
                    sectionName,
                    section
                );


                sections.push(
                    section
                );

            }


            sectionMap
                .get(sectionName)
                .items
                .push(item);

        }
    );


    return sections;

}



/*
=========================================
AUFKLAPPFUNKTION
=========================================
*/

function activateLegendBreakdowns() {

    const buttons =

        document.querySelectorAll(
            ".legend-breakdown-toggle"
        );


    buttons.forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const panelId =

                    button.getAttribute(
                        "aria-controls"
                    );


                const panel =

                    document.getElementById(
                        panelId
                    );


                if (!panel) {

                    return;

                }


                const currentlyOpen =

                    button.getAttribute(
                        "aria-expanded"
                    ) === "true";


                button.setAttribute(

                    "aria-expanded",

                    currentlyOpen
                        ? "false"
                        : "true"

                );


                panel.hidden =
                    currentlyOpen;


                button.classList.toggle(

                    "legend-breakdown-toggle-open",

                    !currentlyOpen

                );


                refreshLucideIcons();

            }
        );

    });

}



/*
=========================================
SELTENE HAUPTAUSZEICHNUNG
=========================================
*/

function getPrimaryAward(
    manager,
    rankingPosition
) {

    if (
        manager.legendRank &&
        manager.legendRank.name ===
            "Legende"
    ) {

        return {

            icon:
                "crown",

            text:
                "Legende",

            className:
                "award-legend"

        };

    }


    if (
        manager.mainRound &&
        manager.mainRound.league ===
            "champions-league" &&
        manager.mainRound.finalPosition ===
            1
    ) {

        return {

            icon:
                "shield-check",

            text:
                "Kickbase Champion",

            className:
                "award-champion"

        };

    }


    if (
        manager.cup &&
        manager.cup.stage ===
            "winner"
    ) {

        return {

            icon:
                "trophy",

            text:
                "Pokalsieger",

            className:
                "award-cup"

        };

    }


    if (
        rankingPosition === 1 &&
        manager.legendPoints > 0
    ) {

        return {

            icon:
                "crown",

            text:
                "Aktuelle Nummer 1",

            className:
                "award-number-one"

        };

    }


    if (
        manager.mainRound &&
        manager.mainRound.currentPosition ===
            1
    ) {

        return {

            icon:
                "chart-no-axes-column-increasing",

            text:
                "Tabellenführer",

            className:
                "award-leader"

        };

    }


    if (
        isRecordHolder(
            manager
        )
    ) {

        return {

            icon:
                "medal",

            text:
                "Rekordhalter",

            className:
                "award-record"

        };

    }


    return null;

}



/*
=========================================
REKORDHALTER PRÜFEN
=========================================
*/

function isRecordHolder(
    manager
) {

    if (
        typeof leagueData ===
            "undefined" ||
        !leagueData.records
    ) {

        return false;

    }


    return Object.values(
        leagueData.records
    ).some(record => {

        return (

            record &&

            record.managerId ===
                manager.id

        );

    });

}



/*
=========================================
LIGA UND TABELLENPLATZ
=========================================
*/

function getManagerLeagueLabel(
    manager
) {

    const mainRound =

        manager.mainRound || {};


    if (
        mainRound.league ===
        "champions-league"
    ) {

        return "Champions League";

    }


    if (
        mainRound.league ===
        "kreisliga"
    ) {

        return "Kreisliga";

    }


    const qualification =

        manager.qualification || {};


    if (
        qualification.group
    ) {

        return `Qualifikation ${qualification.group}`;

    }


    return "Liga noch offen";

}



/*
=========================================
AKTUELLER TABELLENPLATZ
=========================================
*/

function getManagerPositionLabel(
    manager
) {

    const mainRound =

        manager.mainRound || {};


    if (
        mainRound.currentPosition
    ) {

        return `${mainRound.currentPosition}. Platz`;

    }


    const qualification =

        manager.qualification || {};


    if (
        qualification.currentPosition
    ) {

        return `${qualification.currentPosition}. Platz`;

    }


    return "Platz noch offen";

}



/*
=========================================
ÜBERSICHTSKARTEN
=========================================
*/

function renderLegendSummary(
    ranking
) {

    if (!ranking.length) {

        return;

    }


    const leader =
        ranking[0];


    setText(

        "summary-leader-name",

        leader.name

    );


    setText(

        "summary-leader-points",

        `${leader.legendPoints} LP`

    );


    const highestRank =

        getHighestReachedRank(
            ranking
        );


    setText(

        "summary-highest-rank",

        highestRank.name

    );


    setText(

        "summary-highest-rank-count",

        formatManagerCount(
            highestRank.count
        )

    );


    const average =

        ranking.reduce(

            (sum, manager) =>

                sum +
                manager.legendPoints,

            0

        ) / ranking.length;


    setText(

        "summary-average-points",

        `${Math.round(
            average
        )} LP`

    );

}



/*
=========================================
HÖCHSTER ERREICHTER RANG
=========================================
*/

function getHighestReachedRank(
    ranking
) {

    const highestManager =

        ranking.reduce(

            (
                bestManager,
                manager
            ) => {


                if (!bestManager) {

                    return manager;

                }


                return (
                    manager.legendPoints >
                    bestManager.legendPoints
                )

                    ? manager

                    : bestManager;

            },

            null

        );


    const rankName =

        highestManager
            .legendRank
            .name;


    const count =

        ranking.filter(
            manager =>

                manager
                    .legendRank
                    .name ===
                rankName
        ).length;


    return {

        name:
            rankName,

        count:
            count

    };

}



/*
=========================================
PLATZIERUNG
=========================================
*/

function getPositionCardClass(
    position
) {

    if (
        position === 1
    ) {

        return "legend-card-first";

    }


    if (
        position === 2
    ) {

        return "legend-card-second";

    }


    if (
        position === 3
    ) {

        return "legend-card-third";

    }


    return "";

}



function getPositionBadgeClass(
    position
) {

    if (
        position === 1
    ) {

        return "gold";

    }


    if (
        position === 2
    ) {

        return "silver";

    }


    if (
        position === 3
    ) {

        return "bronze";

    }


    return "";

}



/*
=========================================
SAISON
=========================================
*/

function renderSeason() {

    const seasonElement =

        document.getElementById(
            "legends-season"
        );


    if (
        seasonElement &&
        leagueData.season
    ) {

        seasonElement.textContent =

            `Saison ${leagueData.season}`;

    }

}



/*
=========================================
FEHLERMELDUNG
=========================================
*/

function showLegendsError() {

    const container =

        document.getElementById(
            "legends-ranking-cards"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <article class="legends-error-card">

            <i
                data-lucide="triangle-alert"
                aria-hidden="true"
            ></i>


            <div>

                <h3>

                    Rangliste konnte nicht geladen werden

                </h3>


                <p>

                    Prüfe bitte, ob league-data.js und
                    legenden.js korrekt eingebunden sind.

                </p>

            </div>

        </article>

    `;


    refreshLucideIcons();

}



/*
=========================================
HILFSFUNKTIONEN
=========================================
*/

function setText(
    elementId,
    value
) {

    const element =

        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}



function formatManagerCount(
    count
) {

    return count === 1

        ? "1 Manager"

        : `${count} Manager`;

}



function refreshLucideIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}



function escapeHTML(
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