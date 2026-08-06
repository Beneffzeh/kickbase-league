/*
=========================================
KICKBASE LEAGUE – MANAGERPROFIL
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {
    startManagerProfile();
});


function startManagerProfile() {
    if (
        typeof leagueData === "undefined" ||
        typeof calculateLegendPoints !== "function" ||
        typeof getLegendRank !== "function"
    ) {
        showManagerProfileError();
        return;
    }

    const managerId = getManagerIdFromUrl();

    const manager = leagueData.managers.find(
        item => item.id === managerId
    );

    if (!manager) {
        showManagerProfileError();
        return;
    }

    renderManagerProfile(manager);

    if (window.lucide) {
        window.lucide.createIcons();
    }
}


/*
=========================================
MANAGER-ID AUS DER URL
=========================================
*/

function getManagerIdFromUrl() {
    const params = new URLSearchParams(
        window.location.search
    );

    return params.get("id");
}


/*
=========================================
PROFIL RENDERN
=========================================
*/

function renderManagerProfile(manager) {
    const legendPoints =
        calculateLegendPoints(manager);

    const legendRank =
        getLegendRank(legendPoints);

    const qualificationPoints =
        calculateQualificationPoints(manager);

    const mainRoundPoints =
        calculateMainRoundPerformance(manager);

    const finalPositionPoints =
        calculateFinalPositionPoints(manager);

    const cupPoints =
        calculateCupPoints(manager);

    const recordPoints =
        calculateRecordPoints(manager);


    setText(
        "manager-profile-name",
        manager.name
    );

    document.title =
        `${manager.name} | Kickbase League`;


    setText(
        "manager-legend-points",
        legendPoints
    );

    setText(
        "manager-rank-name",
        legendRank.name
    );

    setText(
        "manager-current-rank",
        legendRank.name
    );


    applyRankDesign(legendRank);

    renderRankProgress(
        legendPoints,
        legendRank
    );


    setText(
        "manager-qualification-points",
        `${qualificationPoints} LP`
    );

    setText(
        "manager-main-round-points",
        `${mainRoundPoints} LP`
    );

    setText(
        "manager-final-position-points",
        `${finalPositionPoints} LP`
    );

    setText(
        "manager-cup-points",
        `${cupPoints} LP`
    );

    setText(
        "manager-record-points",
        `${recordPoints} LP`
    );


    renderSeasonData(manager);

renderBadges(
    manager,
    legendRank,
    legendPoints
);
}

/*
=========================================
RANG-DESIGN
=========================================
*/

/*
=========================================
RANG-DESIGN
=========================================
*/

function applyRankDesign(rank) {
    const rankContainer =
        document.getElementById(
            "manager-profile-rank"
        );

    const profileContainer =
        document.getElementById(
            "manager-profile"
        );

    const emblemSymbol =
        document.querySelector(
            "#manager-rank-symbol i"
        );

    const emblemChevrons =
        document.getElementById(
            "manager-rank-chevrons"
        );


    if (rankContainer) {
        rankContainer.className =
            `manager-profile-rank ${rank.className}`;
    }

    if (profileContainer) {
        profileContainer.className =
            `manager-profile-hero ${rank.className}`;

        profileContainer.dataset.rank =
            rank.name.toLowerCase();
    }


    const emblemDesigns = {
        Rookie: {
            icon: "user-round",
            chevrons: 0
        },

        Anwärter: {
            icon: "star",
            chevrons: 1
        },

        Amateur: {
            icon: "star",
            chevrons: 2
        },

        Profi: {
            icon: "gem",
            chevrons: 3
        },

        Elite: {
            icon: "diamond",
            chevrons: 2
        },

        Champion: {
            icon: "trophy",
            chevrons: 1
        },

        Legende: {
            icon: "crown",
            chevrons: 0
        }
    };


    const emblemDesign =
        emblemDesigns[rank.name] ||
        emblemDesigns.Rookie;


    if (emblemSymbol) {
        emblemSymbol.setAttribute(
            "data-lucide",
            emblemDesign.icon
        );
    }


    if (emblemChevrons) {
        emblemChevrons.innerHTML =
            Array.from(
                {
                    length:
                        emblemDesign.chevrons
                },
                () => "<span></span>"
            ).join("");
    }


    setLucideIcon(
        "manager-rank-icon",
        rank.icon
    );


    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {
        window.lucide.createIcons();
    }
}

/*
=========================================
FORTSCHRITT ZUM NÄCHSTEN RANG
=========================================
*/

function renderRankProgress(
    legendPoints,
    currentRank
) {
    const currentRankIndex =
        LEGEND_RANKS.findIndex(
            rank =>
                rank.name === currentRank.name
        );

    const progressElement =
        document.getElementById(
            "manager-progress-value"
        );

    if (currentRankIndex === 0) {
        setText(
            "manager-next-rank",
            "Höchster Rang erreicht"
        );

        if (progressElement) {
            progressElement.style.width =
                "100%";
        }

        return;
    }


    const nextRank =
        LEGEND_RANKS[currentRankIndex - 1];

    const currentMinimum =
        currentRank.minimumPoints;

    const nextMinimum =
        nextRank.minimumPoints;

    const pointsInsideRank =
        legendPoints - currentMinimum;

    const rankRange =
        nextMinimum - currentMinimum;

    const progress =
        Math.min(
            100,
            Math.max(
                0,
                (pointsInsideRank / rankRange) *
                    100
            )
        );

    const missingPoints =
        nextMinimum - legendPoints;


    setText(
        "manager-next-rank",
        `${missingPoints} LP bis ${nextRank.name}`
    );

    if (progressElement) {
        progressElement.style.width =
            `${progress}%`;
    }
}


/*
=========================================
AKTUELLE SAISON
=========================================
*/

function renderSeasonData(manager) {
    const qualification =
        manager.qualification || {};

    const mainRound =
        manager.mainRound || {};

    const cup =
        manager.cup || {};


    setText(
        "manager-qualification-group",
        qualification.group
            ? `Gruppe ${qualification.group}`
            : "–"
    );

    setText(
        "manager-qualification-score",
        formatNumber(
            qualification.points || 0
        )
    );

    setText(
        "manager-qualification-wins",
        qualification.matchdayWins || 0
    );


    setText(
        "manager-current-league",
        formatLeagueName(
            mainRound.league
        )
    );

    setText(
        "manager-main-round-score",
        formatNumber(
            mainRound.points || 0
        )
    );

    setText(
        "manager-main-round-wins",
        mainRound.matchdayWins || 0
    );

    setText(
        "manager-current-position",
        mainRound.currentPosition
            ? `${mainRound.currentPosition}.`
            : "–"
    );

    setText(
        "manager-cup-stage",
        formatCupStage(cup)
    );
}


/*
=========================================
FORMATIERUNGEN
=========================================
*/

function formatLeagueName(league) {
    switch (league) {
        case "champions-league":
            return "Champions League";

        case "kreisliga":
            return "Kreisliga";

        default:
            return "Noch offen";
    }
}


function formatCupStage(cup) {
    const stageNames = {
        "preliminary-round":
            "Vorrunde",

        "round-of-16":
            "Achtelfinale",

        "quarter-final":
            "Viertelfinale",

        "semi-final":
            "Halbfinale",

        final:
            "Finale",

        winner:
            "Pokalsieger"
    };

    const stageName =
        stageNames[cup.stage] ||
        "Noch offen";

    if (
        cup.preliminaryRoundWin &&
        cup.stage !== "preliminary-round"
    ) {
        return `${stageName} · Vorrunde gewonnen`;
    }

    return stageName;
}


function formatNumber(value) {
    return new Intl.NumberFormat(
        "de-DE"
    ).format(value);
}


/*
=========================================
FEHLERMELDUNG
=========================================
*/

function showManagerProfileError() {
    const profile =
        document.getElementById(
            "manager-profile"
        );

    const error =
        document.getElementById(
            "manager-profile-error"
        );

    if (profile) {
        profile.hidden = true;
    }

    if (error) {
        error.hidden = false;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
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


function setLucideIcon(
    elementId,
    iconName
) {
    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.setAttribute(
        "data-lucide",
        iconName
    );
}
/*
=========================================
BADGES
=========================================
*/

/*
=========================================
AUTOMATISCHE AUSZEICHNUNGEN
=========================================
*/

function renderBadges(
    manager,
    legendRank,
    legendPoints
) {
    const container =
        document.getElementById(
            "manager-profile-badges"
        );

    if (!container) {
        return;
    }


    const ranking =
        createLegendRanking();

    const rankingPosition =
        ranking.findIndex(
            item => item.id === manager.id
        ) + 1;


    const qualification =
        manager.qualification || {};

    const mainRound =
        manager.mainRound || {};

    const cup =
        manager.cup || {};


    const totalMatchdayWins =
        (qualification.matchdayWins || 0) +
        (mainRound.matchdayWins || 0);


    const totalSeasonPoints =
        (qualification.points || 0) +
        (mainRound.points || 0);


    const badges = [];


    /*
    =====================================
    KARRIERE-AUSZEICHNUNGEN
    =====================================
    */


    if (
        legendRank &&
        legendRank.name === "Legende"
    ) {
        badges.push({
            icon: "crown",
            text: "Legende",
            color: "gold",
            priority: 100
        });
    }


    if (
        mainRound.league ===
            "champions-league" &&
        mainRound.finalPosition === 1
    ) {
        badges.push({
            icon: "shield-check",
            text: "Kickbase Champion",
            color: "blue",
            priority: 95
        });
    }


    if (
        mainRound.league === "kreisliga" &&
        mainRound.finalPosition === 1
    ) {
        badges.push({
            icon: "medal",
            text: "Kreisliga-Meister",
            color: "purple",
            priority: 90
        });
    }


    if (cup.stage === "winner") {
        badges.push({
            icon: "trophy",
            text: "Pokalsieger",
            color: "red",
            priority: 90
        });
    }


    /*
    =====================================
    AKTUELLE AUSZEICHNUNGEN
    =====================================
    */


    if (
        rankingPosition === 1 &&
        legendPoints > 0
    ) {
        badges.push({
            icon: "crown",
            text: "Aktuelle Nummer 1",
            color: "gold",
            priority: 85
        });
    }


    if (
        mainRound.currentPosition === 1 ||
        (
            !mainRound.league &&
            qualification.currentPosition === 1
        )
    ) {
        badges.push({
            icon: "chart-no-axes-column-increasing",
            text: "Tabellenführer",
            color: "green",
            priority: 70
        });
    }


    /*
    =====================================
    LEISTUNGS-AUSZEICHNUNGEN
    =====================================
    */


    if (totalSeasonPoints >= 40000) {
        badges.push({
            icon: "flame",
            text: "40.000-Punkte-Club",
            color: "red",
            priority: 80
        });
    }


    if (totalMatchdayWins >= 5) {
        badges.push({
            icon: "star",
            text: "Tagessieg-Spezialist",
            color: "purple",
            priority: 60
        });
    }


    /*
    =====================================
    REKORDHALTER
    =====================================
    */


    if (isManagerRecordHolder(manager)) {
        badges.push({
            icon: "medal",
            text: "Rekordhalter",
            color: "gold",
            priority: 75
        });
    }


    /*
    =====================================
    DOUBLE-SIEGER
    =====================================
    */


    const isChampion =
        mainRound.league ===
            "champions-league" &&
        mainRound.finalPosition === 1;

    const isCupWinner =
        cup.stage === "winner";


    if (isChampion && isCupWinner) {
        badges.push({
            icon: "sparkles",
            text: "Double-Sieger",
            color: "gold",
            priority: 110
        });
    }


    /*
    =====================================
    SORTIEREN UND BEGRENZEN
    =====================================

    Es werden höchstens vier Auszeichnungen
    angezeigt, damit das Profil übersichtlich
    bleibt.
    */


    const visibleBadges = badges
        .sort(
            (a, b) =>
                b.priority - a.priority
        )
        .slice(0, 4);


    container.innerHTML = visibleBadges
        .map(badge => `
            <div
                class="
                    manager-profile-badge
                    ${badge.color}
                "
            >
                <span class="manager-profile-badge-icon">

                    <i
                        data-lucide="${badge.icon}"
                        aria-hidden="true"
                    ></i>

                </span>

                <span>
                    ${badge.text}
                </span>
            </div>
        `)
        .join("");


    if (window.lucide) {
        window.lucide.createIcons();
    }
}


/*
=========================================
PRÜFUNG AUF REKORDHALTER
=========================================
*/

function isManagerRecordHolder(manager) {
    if (
        typeof leagueData === "undefined" ||
        !leagueData.records
    ) {
        return false;
    }

    return Object.values(
        leagueData.records
    ).some(record => {
        return (
            record &&
            record.managerId === manager.id
        );
    });
}
