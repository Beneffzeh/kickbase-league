/*
=========================================
KICKBASE LEAGUE – LEGENDENSEITE
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {
    renderLegendRanking();

    if (window.lucide) {
        window.lucide.createIcons();
    }
});

function renderLegendRanking() {

    const container = document.getElementById("legends-ranking");

    if (!container) {
        return;
    }

    const ranking = createLegendRanking();

    container.innerHTML = "";

    ranking.forEach((manager, index) => {

        const card = document.createElement("article");

        card.className = "legend-card";

        card.innerHTML = `

            <div class="legend-card-position ${getPositionClass(index + 1)}">

                ${index + 1}

            </div>

            <div class="legend-card-content">

                <h3 class="legend-card-name">
                    ${manager.name}
                </h3>

                <div class="legend-card-rank ${manager.legendRank.className}">

                    <span class="legend-card-rank-icon">
                        <i data-lucide="${manager.legendRank.icon}"></i>
                    </span>

                    <span>
                        ${manager.legendRank.name}
                    </span>

                </div>

            </div>

            <div class="legend-card-points">

                ${manager.legendPoints}

                <small>LP</small>

            </div>

        `;

        container.appendChild(card);

    });

    if (window.lucide) {
        window.lucide.createIcons();
    }

}

function getPositionClass(position) {

    switch (position) {

        case 1:
            return "gold";

        case 2:
            return "silver";

        case 3:
            return "bronze";

        default:
            return "";

    }

}