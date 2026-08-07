/*
=========================================
KICKBASE LEAGUE – STATISTIKEN
AUTOMATISCHE VERSION
=========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        startStatisticsPage();

    }
);


/*
=========================================
SEITE STARTEN
=========================================
*/

function startStatisticsPage() {

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


    renderAllTimeTable();

    renderSeasonRecords();

    renderHistoricRecords();

    refreshStatisticsIcons();

}


/*
=========================================
EWIGE TABELLE
=========================================
*/

function renderAllTimeTable() {

    const tableBody =
        document.getElementById(
            "all-time-table-body"
        );


    if (!tableBody) {
        return;
    }


    const managers =
        leagueData.managers
            .map(
                manager => {

                    return {

                        id:
                            manager.id,

                        name:
                            manager.name,

                        seasons:
                            getCareerValue(
                                manager,
                                "seasonsPlayed"
                            ),

                        points:
                            getCareerValue(
                                manager,
                                "totalPoints"
                            )

                    };

                }
            )
            .sort(
                (
                    managerA,
                    managerB
                ) => {

                    const pointsDifference =
                        managerB.points -
                        managerA.points;


                    if (
                        pointsDifference !== 0
                    ) {

                        return pointsDifference;

                    }


                    return managerA
                        .name
                        .localeCompare(
                            managerB.name,
                            "de"
                        );

                }
            );


    tableBody.innerHTML =
        managers
            .map(
                (
                    manager,
                    index
                ) => {

                    const rank =
                        index + 1;


                    return `
                        <tr class="${getStatisticsRankClass(rank)}">

                            <td>

                                <span class="stats-rank">
                                    ${rank}
                                </span>

                            </td>


                            <td>

                                <a
                                    class="stats-manager-cell"
                                    href="/kickbase-league/manager-profil.html?id=${manager.id}"
                                >

                                    <span class="stats-manager-avatar">
                                        ${getStatisticsInitials(
                                            manager.name
                                        )}
                                    </span>


                                    <strong>
                                        ${escapeStatisticsHTML(
                                            manager.name
                                        )}
                                    </strong>

                                </a>

                            </td>


                            <td>
                                ${manager.seasons}
                            </td>


                            <td>

                                <strong class="stats-points">

                                    ${formatStatisticsNumber(
                                        manager.points
                                    )}

                                </strong>

                            </td>

                        </tr>
                    `;

                }
            )
            .join("");

}


/*
=========================================
PLATZIERUNGSFARBE
=========================================
*/

function getStatisticsRankClass(
    rank
) {

    if (
        rank === 1
    ) {

        return "rank-gold";

    }


    if (
        rank === 2
    ) {

        return "rank-silver";

    }


    if (
        rank === 3
    ) {

        return "rank-bronze";

    }


    return "";

}


/*
=========================================
SAISONREKORDE
=========================================
*/

function renderSeasonRecords() {

    const recordGrid =
        document.getElementById(
            "season-records-grid"
        );


    if (!recordGrid) {
        return;
    }


    const highestMatchdayRecord =
        getHighestMatchdayRecord();


    const lowestMatchdayRecord =
        getLowestMatchdayRecord();


    const squadValueRecord =
        leagueData.records
            .highestSquadValue ||
        {
            managerId: null,
            value: 0
        };


    const largestTransferRecord =
        leagueData.records
            .largestTransfer ||
        {
            managerId: null,
            value: 0,
            player: null
        };


    const records = [

        {
            title:
                "Höchste Spieltagswertung",

            icon:
                "trending-up",

            managerId:
                highestMatchdayRecord.managerId,

            value:
                highestMatchdayRecord.value > 0
                    ? `${formatStatisticsNumber(
                        highestMatchdayRecord.value
                    )} Punkte`
                    : "– Punkte",

            detail:
                highestMatchdayRecord.value > 0
                    ? `Saison ${leagueData.season}`
                    : "Erste Wertung folgt",

            type:
                "highest-score"
        },


        {
            title:
                "Niedrigste Spieltagswertung",

            icon:
                "trending-down",

            managerId:
                lowestMatchdayRecord.managerId,

            value:
                lowestMatchdayRecord.value !== null
                    ? `${formatStatisticsNumber(
                        lowestMatchdayRecord.value
                    )} Punkte`
                    : "– Punkte",

            detail:
                lowestMatchdayRecord.value !== null
                    ? `Saison ${leagueData.season}`
                    : "Erste Wertung folgt",

            type:
                "lowest-score"
        },


        {
            title:
                "Höchster Mannschaftsmarktwert",

            icon:
                "wallet-cards",

            managerId:
                squadValueRecord.managerId,

            value:
                squadValueRecord.value > 0
                    ? formatStatisticsEuro(
                        squadValueRecord.value
                    )
                    : "– €",

            detail:
                squadValueRecord.value > 0
                    ? `Saison ${leagueData.season}`
                    : "Erster Rekord folgt",

            type:
                "market-value"
        },


        {
            title:
                "Größter Transfer",

            icon:
                "badge-euro",

            managerId:
                largestTransferRecord.managerId,

            value:
                largestTransferRecord.value > 0
                    ? formatStatisticsEuro(
                        largestTransferRecord.value
                    )
                    : "– €",

            detail:
                largestTransferRecord.player
                    ? `Spieler: ${largestTransferRecord.player}`
                    : "Spieler: –",

            type:
                "largest-transfer"
        }

    ];


    recordGrid.innerHTML =
        records
            .map(
                record =>
                    createSeasonRecordHTML(
                        record
                    )
            )
            .join("");


    refreshStatisticsIcons();

}


/*
=========================================
SAISONREKORD-KARTE
=========================================
*/

function createSeasonRecordHTML(
    record
) {

    const managerName =
        record.managerId
            ? getStatisticsManagerName(
                record.managerId
            )
            : null;


    const managerHTML =
        record.managerId &&
        managerName

            ? `
                <a
                    class="record-manager"
                    href="/kickbase-league/manager-profil.html?id=${record.managerId}"
                >
                    ${escapeStatisticsHTML(
                        managerName
                    )}
                </a>
            `

            : `
                <strong class="record-manager">
                    Noch offen
                </strong>
            `;


    return `
        <article
            class="
                season-record-card
                ${record.type}
            "
        >

            <div class="record-card-top">

                <div class="record-icon">

                    <i
                        data-lucide="${record.icon}"
                    ></i>

                </div>


                <span class="record-category">
                    SAISONREKORD
                </span>

            </div>


            <h3>
                ${record.title}
            </h3>


            <div class="record-main-value">

                ${record.value}

            </div>


            ${managerHTML}


            <p class="record-detail">

                ${record.detail}

            </p>

        </article>
    `;

}


/*
=========================================
HÖCHSTE SPIELTAGSLEISTUNG
=========================================
*/

function getHighestMatchdayRecord() {

    const existingRecord =
        leagueData.records
            .highestMatchdayScore;


    if (
        existingRecord &&
        existingRecord.managerId &&
        existingRecord.value > 0
    ) {

        return existingRecord;

    }


    let managerId =
        null;

    let highestScore =
        0;


    leagueData.managers.forEach(
        manager => {

            const scores =
                getAllManagerScores(
                    manager
                );


            scores.forEach(
                score => {

                    if (
                        score >
                        highestScore
                    ) {

                        highestScore =
                            score;

                        managerId =
                            manager.id;

                    }

                }
            );

        }
    );


    return {

        managerId:
            managerId,

        value:
            highestScore

    };

}


/*
=========================================
NIEDRIGSTE SPIELTAGSLEISTUNG
=========================================
*/

function getLowestMatchdayRecord() {

    let managerId =
        null;

    let lowestScore =
        null;


    leagueData.managers.forEach(
        manager => {

            const scores =
                getAllManagerScores(
                    manager
                );


            scores.forEach(
                score => {

                    /*
                    0 wird aktuell als
                    "noch nicht gespielt"
                    behandelt.
                    */

                    if (
                        score <= 0
                    ) {
                        return;
                    }


                    if (
                        lowestScore === null ||
                        score < lowestScore
                    ) {

                        lowestScore =
                            score;

                        managerId =
                            manager.id;

                    }

                }
            );

        }
    );


    return {

        managerId:
            managerId,

        value:
            lowestScore

    };

}


/*
=========================================
ALLE SPIELTAGSPUNKTE EINES MANAGERS
=========================================
*/

function getAllManagerScores(
    manager
) {

    const qualificationScores =
        Array.isArray(
            manager
                .qualification
                .scores
        )
            ? manager
                .qualification
                .scores
            : [];


    const mainRoundScores =
        Array.isArray(
            manager
                .mainRound
                .scores
        )
            ? manager
                .mainRound
                .scores
            : [];


    return [

        ...qualificationScores,

        ...mainRoundScores

    ]
        .map(
            score =>
                Number(score)
        )
        .filter(
            score =>
                !Number.isNaN(score)
        );

}


/*
=========================================
HISTORISCHE REKORDE
=========================================
*/

function renderHistoricRecords() {

    const recordGrid =
        document.getElementById(
            "historic-records-grid"
        );


    if (!recordGrid) {
        return;
    }


    const historicRecords = [

        createHistoricRecord(
            "Rekordmeister Championsleague",
            "crown",
            "championsTitles",
            "Titel",
            "ucl-record"
        ),


        createHistoricRecord(
            "Rekordmeister Kreisliga",
            "medal",
            "kreisligaTitles",
            "Titel",
            "kreisliga-record"
        ),


        createHistoricRecord(
            "Rekordpokalsieger",
            "trophy",
            "cupTitles",
            "Pokalsiege",
            "cup-record"
        ),


        createHistoricRecord(
            "Meiste Aufstiege",
            "arrow-up-circle",
            "promotions",
            "Aufstiege",
            "promotion-record"
        ),


        createHistoricRecord(
            "Meiste Abstiege",
            "arrow-down-circle",
            "relegations",
            "Abstiege",
            "relegation-record"
        )

    ];


    recordGrid.innerHTML =
        historicRecords
            .map(
                record =>
                    createHistoricRecordHTML(
                        record
                    )
            )
            .join("");


    refreshStatisticsIcons();

}


/*
=========================================
HISTORISCHEN REKORD BERECHNEN
=========================================
*/

function createHistoricRecord(
    title,
    icon,
    careerKey,
    valueLabel,
    type
) {

    let bestManager =
        null;

    let bestValue =
        0;


    leagueData.managers.forEach(
        manager => {

            const value =
                getCareerValue(
                    manager,
                    careerKey
                );


            if (
                value >
                bestValue
            ) {

                bestValue =
                    value;

                bestManager =
                    manager;

            }

        }
    );


    return {

        title:
            title,

        icon:
            icon,

        type:
            type,

        managerId:
            bestManager
                ? bestManager.id
                : null,

        manager:
            bestManager
                ? bestManager.name
                : "Noch offen",

        value:
            `${bestValue} ${valueLabel}`

    };

}


/*
=========================================
HISTORISCHE REKORD-KARTE
=========================================
*/

function createHistoricRecordHTML(
    record
) {

    const managerHTML =
        record.managerId

            ? `
                <a
                    href="/kickbase-league/manager-profil.html?id=${record.managerId}"
                >
                    ${escapeStatisticsHTML(
                        record.manager
                    )}
                </a>
            `

            : `
                <strong>
                    Noch offen
                </strong>
            `;


    return `
        <article
            class="
                historic-record-card
                ${record.type}
            "
        >

            <div class="historic-record-icon">

                <i
                    data-lucide="${record.icon}"
                ></i>

            </div>


            <div class="historic-record-content">

                <span>
                    HISTORISCHER REKORD
                </span>


                <h3>
                    ${record.title}
                </h3>


                ${managerHTML}


                <p>
                    ${record.value}
                </p>

            </div>

        </article>
    `;

}


/*
=========================================
KARRIEREWERT
=========================================
*/

function getCareerValue(
    manager,
    key
) {

    if (
        !manager ||
        !manager.career
    ) {

        return 0;

    }


    const value =
        Number(
            manager.career[
                key
            ]
        );


    return Number.isNaN(value)
        ? 0
        : value;

}


/*
=========================================
MANAGERNAME
=========================================
*/

function getStatisticsManagerName(
    managerId
) {

    const manager =
        leagueData.managers.find(
            item =>
                item.id ===
                managerId
        );


    return manager
        ? manager.name
        : null;

}


/*
=========================================
INITIALEN
=========================================
*/

function getStatisticsInitials(
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
        parts[0].charAt(0) +
        parts[
            parts.length - 1
        ].charAt(0)
    )
        .toUpperCase();

}


/*
=========================================
ZAHL FORMATIEREN
=========================================
*/

function formatStatisticsNumber(
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
EURO FORMATIEREN
=========================================
*/

function formatStatisticsEuro(
    value
) {

    return new Intl.NumberFormat(
        "de-DE",
        {
            style:
                "currency",

            currency:
                "EUR",

            maximumFractionDigits:
                0
        }
    ).format(
        Number(value) || 0
    );

}


/*
=========================================
HTML ABSICHERN
=========================================
*/

function escapeStatisticsHTML(
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
ICONS NEU LADEN
=========================================
*/

function refreshStatisticsIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}