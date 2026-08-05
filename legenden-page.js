/*
=========================================
KICKBASE LEAGUE – LEGENDENSEITE
=========================================
*/


document.addEventListener("DOMContentLoaded", () => {
    startLegendsPage();
});


function startLegendsPage() {
    if (
        typeof leagueData === "undefined" ||
        typeof createLegendRanking !== "function"
    ) {
        console.error(
            "Die Ligadaten oder die Legendenberechnung konnten nicht geladen werden."
        );

        showLegendsError();
        return;
    }

    const ranking = createLegendRanking();

    renderLegendCards(ranking);
    renderLegendSummary(ranking);
    renderSeason();

    refreshLucideIcons();
}


/*
=========================================
MANAGERKARTEN
=========================================
*/

function renderLegendCards(ranking) {
    const container = document.getElementById(
        "legends-ranking-cards"
    );

    if (!container) {
        console.error(
            'Das Element mit der ID "legends-ranking-cards" fehlt.'
        );
        return;
    }

    container.innerHTML = "";

    ranking.forEach((manager, index) => {
        const position = index + 1;

        const card = document.createElement("article");

        card.className = [
            "legend-card",
            getPositionCardClass(position),
            manager.legendRank.className
        ]
            .filter(Boolean)
            .join(" ");

        card.innerHTML = createLegendCardHTML(
            manager,
            position
        );

        container.appendChild(card);
    });
}


function createLegendCardHTML(manager, position) {
    return `
        <div class="legend-card-glow"></div>

        <div class="legend-card-top">

            <span class="
                legend-card-position
                ${getPositionBadgeClass(position)}
            ">
                ${getPositionDisplay(position)}
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
                ${escapeHTML(manager.name)}
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
                    ${manager.legendRank.name}
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


        <div class="legend-card-footer">

            <span>
                ${getRankProgressText(manager)}
            </span>

            <i
                data-lucide="chevron-right"
                aria-hidden="true"
            ></i>

        </div>
    `;
}


/*
=========================================
ÜBERSICHTSKARTEN
=========================================
*/

function renderLegendSummary(ranking) {
    if (!ranking.length) {
        return;
    }

    const leader = ranking[0];

    setText(
        "summary-leader-name",
        leader.name
    );

    setText(
        "summary-leader-points",
        `${leader.legendPoints} LP`
    );


    const highestRank = getHighestReachedRank(ranking);

    setText(
        "summary-highest-rank",
        highestRank.name
    );

    setText(
        "summary-highest-rank-count",
        formatManagerCount(highestRank.count)
    );


    const average =
        ranking.reduce(
            (sum, manager) =>
                sum + manager.legendPoints,
            0
        ) / ranking.length;

    setText(
        "summary-average-points",
        `${Math.round(average)} LP`
    );
}


/*
=========================================
HÖCHSTER ERREICHTER RANG
=========================================
*/

function getHighestReachedRank(ranking) {
    const highestManager = ranking.reduce(
        (bestManager, manager) => {
            if (!bestManager) {
                return manager;
            }

            return manager.legendPoints >
                bestManager.legendPoints
                ? manager
                : bestManager;
        },
        null
    );

    const rankName =
        highestManager.legendRank.name;

    const count = ranking.filter(
        manager =>
            manager.legendRank.name === rankName
    ).length;

    return {
        name: rankName,
        count: count
    };
}


/*
=========================================
RANGFORTSCHRITT
=========================================
*/

function getRankProgressText(manager) {
    const currentRankIndex =
        LEGEND_RANKS.findIndex(
            rank =>
                rank.name ===
                manager.legendRank.name
        );

    if (currentRankIndex === 0) {
        return "Höchster Rang erreicht";
    }

    const nextRank =
        LEGEND_RANKS[currentRankIndex - 1];

    if (!nextRank) {
        return "Höchster Rang erreicht";
    }

    const missingPoints =
        nextRank.minimumPoints -
        manager.legendPoints;

    if (missingPoints <= 0) {
        return `Rang: ${manager.legendRank.name}`;
    }

    return `${missingPoints} LP bis ${nextRank.name}`;
}


/*
=========================================
PLATZIERUNG
=========================================
*/

function getPositionCardClass(position) {
    if (position === 1) {
        return "legend-card-first";
    }

    if (position === 2) {
        return "legend-card-second";
    }

    if (position === 3) {
        return "legend-card-third";
    }

    return "";
}


function getPositionBadgeClass(position) {
    if (position === 1) {
        return "gold";
    }

    if (position === 2) {
        return "silver";
    }

    if (position === 3) {
        return "bronze";
    }

    return "";
}


function getPositionDisplay(position) {
    if (position === 1) {
        return "1";
    }

    if (position === 2) {
        return "2";
    }

    if (position === 3) {
        return "3";
    }

    return position;
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
    const container = document.getElementById(
        "legends-ranking-cards"
    );

    if (!container) {
        return;
    }

    container.innerHTML = `
        <article class="legends-error-card">

            <i data-lucide="triangle-alert"></i>

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

function setText(elementId, value) {
    const element =
        document.getElementById(elementId);

    if (element) {
        element.textContent = value;
    }
}


function formatManagerCount(count) {
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


function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}