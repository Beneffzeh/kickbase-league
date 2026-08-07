/*
=========================================
KICKBASE LEAGUE – POKAL
Automatische Darstellung
Saison 2026/27
=========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
        Zentrale Ligadaten zuerst
        vollständig berechnen.
        */

        if (
            typeof recalculateLeagueData ===
            "function"
        ) {

            recalculateLeagueData();

        }


        /*
        Pokalseite automatisch aufbauen.
        */

        renderPreliminaryRound();

        renderCupBracket();

        renderCupStatus();

        renderCupWinner();


        /*
        Lucide-Icons nach der automatischen
        Darstellung erneut erzeugen.
        */

        if (
            typeof lucide !== "undefined"
        ) {

            lucide.createIcons();

        }

    }
);


/*
=========================================
HILFSFUNKTIONEN
=========================================
*/


function getCupManagerName(
    managerId
) {

    if (!managerId) {
        return null;
    }


    const manager =
        leagueData.managers.find(
            item =>
                item.id === managerId
        );


    return manager
        ? manager.name
        : null;

}


/*
=========================================
POKALSIEGER EINES SPIELS ERMITTELN
=========================================
*/

function getCupMatchWinner(
    matchId
) {

    const rounds = [

        leagueData.cup.preliminaryRound,

        leagueData.cup.roundOf16,

        leagueData.cup.quarterFinals,

        leagueData.cup.semiFinals,

        leagueData.cup.final

    ];


    for (
        const round of rounds
    ) {

        const match =
            round.find(
                item =>
                    item.id === matchId
            );


        if (!match) {
            continue;
        }


        const homeId =
            getResolvedCupParticipant(
                match.home
            );


        const awayId =
            getResolvedCupParticipant(
                match.away
            );


        if (
            !homeId ||
            !awayId
        ) {
            return null;
        }


        const homeScore =
            getManagerCupScore(
                homeId,
                match.matchday
            );


        const awayScore =
            getManagerCupScore(
                awayId,
                match.matchday
            );


        if (
            homeScore === null ||
            awayScore === null ||
            homeScore === awayScore
        ) {

            return null;

        }


        return homeScore >
            awayScore
                ? homeId
                : awayId;

    }


    return null;

}
/*
=========================================
POKALTEILNEHMER AUFLÖSEN
=========================================
*/

function getResolvedCupParticipant(
    participant
) {

    if (!participant) {
        return null;
    }


    /*
    Normaler Manager
    */

    if (
        !participant.startsWith(
            "winner-"
        )
    ) {

        return participant;

    }


    /*
    Sieger aus vorherigem Spiel
    */

    const previousMatchId =
        participant.replace(
            "winner-",
            ""
        );


    return getCupMatchWinner(
        previousMatchId
    );

}


/*
=========================================
POKALSPIEL SUCHEN
=========================================
*/

function getCupMatchById(
    matchId
) {

    const rounds = [

        leagueData.cup.preliminaryRound,
        leagueData.cup.roundOf16,
        leagueData.cup.quarterFinals,
        leagueData.cup.semiFinals,
        leagueData.cup.final

    ];


    for (
        const round of rounds
    ) {

        const match =
            round.find(
                item =>
                    item.id === matchId
            );


        if (match) {
            return match;
        }

    }


    return null;

}


/*
=========================================
ANZEIGENAME EINES TEILNEHMERS
=========================================
*/

function getCupParticipantDisplayName(
    participant
) {

    if (!participant) {
        return "Noch offen";
    }


    const resolvedId =
        getResolvedCupParticipant(
            participant
        );


    /*
    Sieger steht bereits fest.
    */

    if (resolvedId) {

        return (
            getCupManagerName(
                resolvedId
            ) || "Noch offen"
        );

    }


    /*
    Vorheriges Spiel noch nicht entschieden.
    */

    if (
        participant.startsWith(
            "winner-"
        )
    ) {

        const matchId =
            participant.replace(
                "winner-",
                ""
            );


        if (
            matchId.startsWith("VR")
        ) {

            return (
                "Sieger Vorrunde " +
                matchId.replace(
                    "VR",
                    ""
                )
            );

        }


        if (
            matchId.startsWith("AF")
        ) {

            return (
                "Sieger AF " +
                matchId.replace(
                    "AF",
                    ""
                )
            );

        }


        if (
            matchId.startsWith("VF")
        ) {

            return (
                "Sieger VF " +
                matchId.replace(
                    "VF",
                    ""
                )
            );

        }


        if (
            matchId.startsWith("HF")
        ) {

            return (
                "Sieger HF " +
                matchId.replace(
                    "HF",
                    ""
                )
            );

        }

    }


    return "Noch offen";

}

/*
=========================================
ANKLICKBARER MANAGERNAME
=========================================
*/

function getCupParticipantHTML(
    participant
) {

    const managerId =
        getResolvedCupParticipant(
            participant
        );


    const displayName =
        getCupParticipantDisplayName(
            participant
        );


    /*
    Echter Manager steht fest:
    Profil-Link erzeugen.
    */

    if (managerId) {

        return `
            <a
                class="pokal-manager-link"
                href="/kickbase-league/manager-profil.html?id=${managerId}"
            >
                ${displayName}
            </a>
        `;

    }


    /*
    Noch offener Platzhalter.
    */

    return `
        <span>
            ${displayName}
        </span>
    `;

}
/*
=========================================
PUNKTZAHL FÜR DIE ANZEIGE
=========================================
*/

function getCupDisplayScore(
    participant,
    matchday
) {

    const managerId =
        getResolvedCupParticipant(
            participant
        );


    if (!managerId) {
        return "-";
    }


    const score =
        getManagerCupScore(
            managerId,
            matchday
        );


    if (
        score === null ||
        score === undefined
    ) {

        return "-";

    }


    return score;

}


/*
=========================================
SPIEL BEREITS ENTSCHIEDEN?
=========================================
*/

function isCupMatchFinished(
    match
) {

    if (!match) {
        return false;
    }


    return Boolean(
        getCupMatchWinner(
            match.id
        )
    );

}
/*
=========================================
VORRUNDE AUTOMATISCH DARSTELLEN
=========================================
*/

function renderPreliminaryRound() {

    const container =
        document.querySelector(
            ".pokal-preliminary-grid"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        leagueData.cup.preliminaryRound
            .map(
                (match, index) =>
                    createCupMatchHTML(
                        match,
                        `Vorrundenspiel ${index + 1}`,
                        index === 0
                            ? "Sieger erreicht Achtelfinale 1"
                            : "Sieger erreicht Achtelfinale 8"
                    )
            )
            .join("");

}


/*
=========================================
TURNIERBAUM AUTOMATISCH DARSTELLEN
=========================================
*/

function renderCupBracket() {

    renderCupRoundIntoBracket(
        ".achtelfinale-runde .turnier-spiele",
        leagueData.cup.roundOf16,
        "Achtelfinale"
    );


    renderCupRoundIntoBracket(
        ".viertelfinale-runde .turnier-spiele",
        leagueData.cup.quarterFinals,
        "Viertelfinale"
    );


    renderCupRoundIntoBracket(
        ".halbfinale-runde .turnier-spiele",
        leagueData.cup.semiFinals,
        "Halbfinale"
    );


    renderCupRoundIntoBracket(
        ".finale-runde .turnier-spiele",
        leagueData.cup.final,
        "Pokalfinale",
        true
    );

}


/*
=========================================
RUNDE IN TURNIERBAUM SCHREIBEN
=========================================
*/

function renderCupRoundIntoBracket(
    selector,
    matches,
    roundName,
    isFinal = false
) {

    const container =
        document.querySelector(
            selector
        );


    if (
        !container ||
        !Array.isArray(matches)
    ) {
        return;
    }


    container.innerHTML =
        matches
            .map(
                (match, index) => {

                    const title =
                        isFinal
                            ? "Pokalfinale"
                            : `${roundName} ${index + 1}`;


                    const footer =
                        isFinal
                            ? "Sieger wird Kickbase-Pokalsieger"
                            : "";


                    return createCupMatchHTML(
                        match,
                        title,
                        footer,
                        isFinal
                    );

                }
            )
            .join("");

}


/*
=========================================
HTML FÜR EIN POKALSPIEL
=========================================
*/

function createCupMatchHTML(
    match,
    title,
    footer = "",
    isFinal = false
) {

    const homeName =
        getCupParticipantDisplayName(
            match.home
        );


    const awayName =
        getCupParticipantDisplayName(
            match.away
        );


    const homeScore =
        getCupDisplayScore(
            match.home,
            match.matchday
        );


    const awayScore =
        getCupDisplayScore(
            match.away,
            match.matchday
        );


    const winnerId =
        getCupMatchWinner(
            match.id
        );


    const homeId =
        getResolvedCupParticipant(
            match.home
        );


    const awayId =
        getResolvedCupParticipant(
            match.away
        );


    const homeWinnerClass =
        winnerId &&
        winnerId === homeId
            ? " pokal-team-winner"
            : "";


    const awayWinnerClass =
        winnerId &&
        winnerId === awayId
            ? " pokal-team-winner"
            : "";


    const finalClass =
        isFinal
            ? " final-match"
            : "";


    return `
        <article class="pokal-match${finalClass}">

            <div class="pokal-match-heading">

                <span>${title}</span>

                <small>
                    ${match.matchday}. Spieltag
                </small>

            </div>


            <div class="pokal-team${homeWinnerClass}">

                <span class="pokal-team-name">

    ${getCupParticipantHTML(
        match.home
    )}

</span>

                <strong>
                    ${homeScore}
                </strong>

            </div>


            <div class="pokal-team${awayWinnerClass}">

                <span class="pokal-team-name">

    ${getCupParticipantHTML(
        match.away
    )}

</span>

                <strong>
                    ${awayScore}
                </strong>

            </div>


            ${
                footer
                    ? `
                        <div class="pokal-match-footer">

                            <i data-lucide="${
                                isFinal
                                    ? "trophy"
                                    : "arrow-right"
                            }"></i>

                            ${footer}

                        </div>
                    `
                    : ""
            }

        </article>
    `;

}
/*
=========================================
TURNIERSTATUS AUTOMATISCH DARSTELLEN
=========================================
*/

function renderCupStatus() {

    const tbody =
        document.querySelector(
            ".pokal-status-table tbody"
        );


    if (!tbody) {
        return;
    }


    const rounds = [

        {
            name: "Vorrunde",
            matchday: 4,
            matches: leagueData.cup.preliminaryRound
        },

        {
            name: "Achtelfinale",
            matchday: 8,
            matches: leagueData.cup.roundOf16
        },

        {
            name: "Viertelfinale",
            matchday: 18,
            matches: leagueData.cup.quarterFinals
        },

        {
            name: "Halbfinale",
            matchday: 26,
            matches: leagueData.cup.semiFinals
        },

        {
            name: "Finale",
            matchday: 34,
            matches: leagueData.cup.final
        }

    ];


    tbody.innerHTML =
        rounds
            .map(
                (round, index) => {

                    const finished =
                        round.matches.every(
                            match =>
                                isCupMatchFinished(
                                    match
                                )
                        );


                    const participantsReady =
                        round.matches.some(
                            match => {

                                return (
                                    getResolvedCupParticipant(
                                        match.home
                                    ) &&
                                    getResolvedCupParticipant(
                                        match.away
                                    )
                                );

                            }
                        );


                    let statusClass =
                        "pokal-status-locked";


                    let statusIcon =
                        "lock";


                    let statusText =
                        "Noch nicht begonnen";


                    if (finished) {

                        statusClass =
                            "pokal-status-finished";

                        statusIcon =
                            "circle-check";

                        statusText =
                            "Abgeschlossen";

                    }

                    else if (
                        participantsReady
                    ) {

                        statusClass =
                            "pokal-status-pending";

                        statusIcon =
                            index === 0
                                ? "dice-5"
                                : "clock-3";

                        statusText =
                            index === 0
                                ? "Ausgelost"
                                : "Paarungen stehen";

                    }


                    return `
                        <tr>

                            <td>
                                <strong>
                                    ${round.name}
                                </strong>
                            </td>

                            <td>
                                ${round.matchday}. Spieltag
                            </td>

                            <td>

                                <span class="pokal-status ${statusClass}">

                                    <i data-lucide="${statusIcon}"></i>

                                    ${statusText}

                                </span>

                            </td>

                        </tr>
                    `;

                }
            )
            .join("");

}


/*
=========================================
POKALSIEGER AUTOMATISCH DARSTELLEN
=========================================
*/

function renderCupWinner() {

    const winnerElement =
        document.querySelector(
            ".pokal-current-winner strong"
        );


    if (!winnerElement) {
        return;
    }


    const winnerId =
        getCupMatchWinner(
            "F1"
        );


    if (!winnerId) {

        winnerElement.textContent =
            "Noch offen";

        return;

    }


    const winnerName =
        getCupManagerName(
            winnerId
        );


    winnerElement.textContent =
        winnerName || "Noch offen";

}