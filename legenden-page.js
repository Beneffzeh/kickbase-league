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
    const tableBody = document.getElementById("legends-ranking-body");

    if (!tableBody) {
        return;
    }

    const ranking = createLegendRanking();

    tableBody.innerHTML = "";

    ranking.forEach((manager, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
    <td>
        <span class="legend-position ${getPositionClass(index + 1)}">
            ${index + 1}
        </span>
    </td>

    <td>
        <div class="legend-manager">
            <span class="legend-manager-name">
                ${manager.name}
            </span>
        </div>
    </td>

    <td>
        <div class="legend-rank ${manager.legendRank.className}">
            <span class="legend-rank-icon">
                <i data-lucide="${manager.legendRank.icon}"></i>
            </span>

            <span class="legend-rank-name">
                ${manager.legendRank.name}
            </span>
        </div>
    </td>

    <td>
        <span class="legend-points">
            ${manager.legendPoints} LP
        </span>
    </td>
`;
        

        tableBody.appendChild(row);
    });
    if (window.lucide) {
    window.lucide.createIcons();
}
}


function getPositionClass(position) {
    if (position === 1) {
        return "legend-position-gold";
    }

    if (position === 2) {
        return "legend-position-silver";
    }

    if (position === 3) {
        return "legend-position-bronze";
    }

    return "";
}