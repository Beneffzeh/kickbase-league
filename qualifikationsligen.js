/*
=========================================
KICKBASE LEAGUE – QUALIFIKATIONSLIGEN
AUTOMATISCHE TABELLEN
MIT FORMKURVE
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startQualificationPage();

    }
);


/*
=========================================
SEITE STARTEN
=========================================
*/

function startQualificationPage() {

    if (
        typeof leagueData === "undefined"
    ) {

        console.error(
            "league-data.js konnte nicht geladen werden."
        );

        return;
    }


    renderQualificationSeason();

    renderQualificationTables();

    renderFifthPlaceComparison();

    renderQualificationMatchday();

    refreshQualificationIcons();

}


/*
=========================================
SAISON ANZEIGEN
=========================================
*/

function renderQualificationSeason() {

    const seasonText =
        `Saison ${leagueData.season}`;


    setQualificationText(
        "qualification-season",
        seasonText
    );


    setQualificationText(
        "qualification-mobile-season",
        seasonText
    );

}


/*
=========================================
TABELLEN RENDERN
=========================================
*/

function renderQualificationTables() {

    renderQualificationGroup(
        "A",
        "qualification-table-a"
    );


    renderQualificationGroup(
        "B",
        "qualification-table-b"
    );

}


/*
=========================================
EINZELNE GRUPPE RENDERN
=========================================
*/

function renderQualificationGroup(
    groupName,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    const managers =
        getSortedQualificationManagers(
            groupName
        );


    container.innerHTML =
        managers
            .map(
                (
                    manager,
                    index
                ) => {

                    const position =
                        index + 1;


                    const status =
                        getQualificationStatus(
                            position
                        );


                    return `
                        <tr class="${status.rowClass}">

                            <td>

                                <span class="qualification-position">
                                    ${position}
                                </span>

                            </td>


                            <td>

                                <a
                                    class="qualification-manager-cell qualification-manager-link"
                                    href="/kickbase-league/manager-profil.html?id=${manager.id}"
                                >

                                    <span class="qualification-manager-avatar">
                                        ${getManagerInitials(manager.name)}
                                    </span>

                                    <strong>
                                        ${escapeQualificationHTML(
                                            manager.name
                                        )}
                                    </strong>

                                </a>

                            </td>


                            <td class="qualification-points-column">

                                <strong>
                                    ${formatQualificationNumber(
                                        manager
                                            .qualification
                                            .points
                                    )}
                                </strong>

                            </td>


                            <td class="qualification-points-column">

                                <strong>
                                    ${
                                        manager
                                            .qualification
                                            .matchdayWins || 0
                                    }
                                </strong>

                            </td>


                            <td class="qualification-form-column">

                                ${createQualificationFormHTML(
                                    manager,
                                    groupName
                                )}

                            </td>


                            <td class="qualification-status-column">

                                <span class="
                                    qualification-status
                                    ${status.statusClass}
                                ">

                                    <i
                                        data-lucide="${status.icon}"
                                        aria-hidden="true"
                                    ></i>

                                    ${status.label}

                                </span>

                            </td>

                        </tr>
                    `;

                }
            )
            .join("");


    refreshQualificationIcons();

}


/*
=========================================
GRUPPE SORTIEREN
=========================================
*/

function getSortedQualificationManagers(
    groupName
) {

    const managers =
        leagueData.managers.filter(
            manager =>
                manager
                    .qualification
                    .group ===
                groupName
        );


    return [...managers]
        .sort(
            (
                managerA,
                managerB
            ) => {

                const pointsDifference =
                    (
                        managerB
                            .qualification
                            .points
                    )
                    -
                    (
                        managerA
                            .qualification
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
                            .qualification
                            .matchdayWins
                    )
                    -
                    (
                        managerA
                            .qualification
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
STATUS JE TABELLENPLATZ
=========================================
*/

function getQualificationStatus(
    position
) {

    if (
        position >= 1 &&
        position <= 4
    ) {

        return {

            label:
                "Champions League",

            icon:
                "trophy",

            rowClass:
                "champions-place",

            statusClass:
                "qualification-status-champions"

        };

    }


    if (
        position === 5
    ) {

        return {

            label:
                "Gruppenvergleich",

            icon:
                "scale",

            rowClass:
                "comparison-place",

            statusClass:
                "qualification-status-comparison"

        };

    }


    return {

        label:
            "Kreisliga",

        icon:
            "shield",

        rowClass:
            "kreisliga-place",

        statusClass:
            "qualification-status-kreisliga"

    };

}


/*
=========================================
FORM DER LETZTEN 5 SPIELTAGE
=========================================
*/

function createQualificationFormHTML(
    manager,
    groupName
) {

    const form =
        getQualificationForm(
            manager,
            groupName
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
        <div class="qualification-form">

            ${
                slots
                    .map(
                        position => {

                            if (
                                position === null
                            ) {

                                return `
                                    <span class="
                                        qualification-form-badge
                                        qualification-form-empty
                                    ">
                                        –
                                    </span>
                                `;

                            }


                            let formClass =
                                "qualification-form-mid";


                            if (
                                position <= 3
                            ) {

                                formClass =
                                    "qualification-form-good";

                            }

                            else if (
                                position >= 7
                            ) {

                                formClass =
                                    "qualification-form-bad";

                            }


                            return `
                                <span
                                    class="
                                        qualification-form-badge
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
FORM BERECHNEN
=========================================
*/

function getQualificationForm(
    manager,
    groupName
) {

    if (
        !Array.isArray(
            leagueData.qualificationMatchdays
        )
    ) {

        return [];

    }


    const groupManagers =
        leagueData.managers.filter(
            item =>
                item
                    .qualification
                    .group ===
                groupName
        );


    const positions = [];


    leagueData
        .qualificationMatchdays
        .forEach(
            matchday => {

                if (
                    !matchday ||
                    !matchday.scores
                ) {

                    return;

                }


                const scores =
                    groupManagers
                        .map(
                            groupManager => ({

                                id:
                                    groupManager.id,

                                score:
                                    Number(
                                        matchday.scores[
                                            groupManager.id
                                        ]
                                    ) || 0

                            })
                        );


                const hasRealScores =
                    scores.some(
                        result =>
                            result.score > 0
                    );


                if (!hasRealScores) {
                    return;
                }


                const managerResult =
                    scores.find(
                        result =>
                            result.id ===
                            manager.id
                    );


                if (!managerResult) {
                    return;
                }


                const position =
                    1 +
                    scores.filter(
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
VERGLEICH DER FÜNFTEN PLÄTZE
=========================================
*/

function renderFifthPlaceComparison() {

    const groupA =
        getSortedQualificationManagers(
            "A"
        );


    const groupB =
        getSortedQualificationManagers(
            "B"
        );


    const fifthA =
        groupA[4] || null;


    const fifthB =
        groupB[4] || null;


    if (fifthA) {

        setQualificationText(
            "qualification-fifth-a",
            `${
                fifthA.name
            } · ${
                formatQualificationNumber(
                    fifthA
                        .qualification
                        .points
                )
            } Punkte`
        );

    }


    if (fifthB) {

        setQualificationText(
            "qualification-fifth-b",
            `${
                fifthB.name
            } · ${
                formatQualificationNumber(
                    fifthB
                        .qualification
                        .points
                )
            } Punkte`
        );

    }


    renderFifthPlaceComparisonNote(
        fifthA,
        fifthB
    );

}


/*
=========================================
VERGLEICHS-HINWEIS
=========================================
*/

function renderFifthPlaceComparisonNote(
    fifthA,
    fifthB
) {

    const noteElement =
        document.getElementById(
            "qualification-comparison-note"
        );


    if (!noteElement) {
        return;
    }


    if (
        !fifthA ||
        !fifthB
    ) {

        noteElement.textContent =
            "Der Vergleich wird automatisch aus den aktuellen Tabellen berechnet.";

        return;
    }


    const pointsA =
        fifthA
            .qualification
            .points;


    const pointsB =
        fifthB
            .qualification
            .points;


    const currentMatchday =
        getCurrentQualificationMatchday();


    if (
        currentMatchday < 14
    ) {

        if (
            pointsA === pointsB
        ) {

            noteElement.textContent =
                "Beide Fünftplatzierten liegen aktuell punktgleich. Entscheidend ist der Stand nach dem 14. Spieltag.";

            return;
        }


        const leader =
            pointsA > pointsB
                ? fifthA
                : fifthB;


        noteElement.textContent =
            `${leader.name} hätte nach aktuellem Stand den letzten Champions-League-Platz. Entscheidend ist der Stand nach dem 14. Spieltag.`;

        return;
    }


    if (
        pointsA === pointsB
    ) {

        noteElement.textContent =
            "Nach dem 14. Spieltag sind beide Fünftplatzierten punktgleich. Für diesen Sonderfall muss eine zusätzliche Entscheidungsregel angewendet werden.";

        return;
    }


    const winner =
        pointsA > pointsB
            ? fifthA
            : fifthB;


    noteElement.textContent =
        `${winner.name} gewinnt den Vergleich der fünften Plätze und qualifiziert sich für die Champions League.`;

}


/*
=========================================
AKTUELLER SPIELTAG
=========================================
*/

function renderQualificationMatchday() {

    const matchday =
        getCurrentQualificationMatchday();


    const label =
        matchday === 0
            ? "Saisonstart"
            : `${matchday}. Spieltag`;


    setQualificationText(
        "qualification-matchday-label",
        label
    );

}


/*
=========================================
INITIALEN
=========================================
*/

function getManagerInitials(
    name
) {

    const parts =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (
        parts.length === 0
    ) {
        return "?";
    }


    if (
        parts.length === 1
    ) {

        return parts[0]
            .charAt(0)
            .toUpperCase();

    }


    return (
        parts[0]
            .charAt(0)
            +
        parts[
            parts.length - 1
        ]
            .charAt(0)
    )
        .toUpperCase();

}


/*
=========================================
ZAHL FORMATIEREN
=========================================
*/

function formatQualificationNumber(
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
TEXT SETZEN
=========================================
*/

function setQualificationText(
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


/*
=========================================
HTML ABSICHERN
=========================================
*/

function escapeQualificationHTML(
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
ICONS AKTUALISIEREN
=========================================
*/

function refreshQualificationIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}