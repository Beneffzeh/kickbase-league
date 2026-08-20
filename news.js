/*
=========================================
KICKBASE LEAGUE NEWS
AUTOMATISCHE NEWS-ZENTRALE
Saison 2026/27
=========================================

AUTOMATISCH AUS:

- league-data.js
- Qualifikationspunkten
- Hauptphasenpunkten
- Tabellenständen
- Form
- Spieltagssiegen
- Pokaldaten
- Saisonprognose

PHASEN:

QUALIFIKATION
→ Quali A + Quali B

HAUPTRUNDE
→ Champions League + Kreisliga

=========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        startNewsPage();

    }
);


/*
=========================================
START
=========================================
*/


function startNewsPage() {

    if (
        typeof leagueData ===
        "undefined"
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


    renderNewsHeader();

    renderNewsLeaguePanels();

    renderNewsWeeklyAwards();

    renderNewsHero();

    renderNewsManagerStories();

    renderNewsFeed();

    renderNewsPredictionUpdate();

    renderNewsCup();

    refreshNewsIcons();

}


/*
=========================================
AKTUELLE NEWS-PHASE
=========================================
*/


function getNewsPhase() {

    /*
    Sobald Hauptphasenmanager
    vorhanden sind, wechseln wir
    automatisch auf CL + Kreisliga.
    */

    const mainRoundManagers =
        leagueData.managers.filter(
            manager =>
                manager.mainRound &&
                manager.mainRound.league
        );


    if (
        mainRoundManagers.length === 18
    ) {

        return "main-round";

    }


    return "qualification";

}


/*
=========================================
HEADER
=========================================
*/


function renderNewsHeader() {

    const phase =
        getNewsPhase();


    const matchday =
        getNewsCurrentMatchday();


    setNewsText(
        "news-edition-season",
        `Saison ${leagueData.season}`
    );


    if (
        matchday > 0
    ) {

        setNewsText(
            "news-edition-number",
            `SPIELTAG ${matchday}`
        );

    }

    else {

        setNewsText(
            "news-edition-number",
            "SAISONSTART"
        );

    }


    if (
        phase ===
        "qualification"
    ) {

        setNewsText(
            "news-phase-badge",
            "QUALIFIKATION"
        );

    }

    else {

        setNewsText(
            "news-phase-badge",
            "HAUPTRUNDE"
        );

    }


    const today =
        new Date();


    const formattedDate =
        new Intl.DateTimeFormat(
            "de-DE",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        ).format(today);


    setNewsText(
        "news-current-date",
        formattedDate
    );

}


/*
=========================================
AKTUELLER REALER SPIELTAG
=========================================
*/


function getNewsCurrentMatchday() {

    const phase =
        getNewsPhase();


    if (
        phase ===
        "qualification"
    ) {

        return getLatestRealMatchdayNumber(
            leagueData
                .qualificationMatchdays
        );

    }


    return getLatestRealMatchdayNumber(
        leagueData
            .mainRoundMatchdays
    );

}


/*
=========================================
LETZTEN ECHTEN SPIELTAG ERMITTELN
=========================================
*/


function getLatestRealMatchdayNumber(
    matchdays
) {

    if (
        !Array.isArray(matchdays)
    ) {

        return 0;

    }


    let latest =
        0;


    matchdays.forEach(
        (
            matchday,
            index
        ) => {

            if (
                !matchday ||
                !matchday.scores
            ) {

                return;

            }


            const hasRealScore =
                Object.values(
                    matchday.scores
                )
                .some(
                    score =>
                        Number(score) > 0
                );


            if (!hasRealScore) {
                return;
            }


            latest =
                Number(
                    matchday.matchday
                )
                ||
                index + 1;

        }
    );


    return latest;

}


/*
=========================================
AKTUELLER SPIELTAGSBLOCK
=========================================
*/


function getLatestNewsMatchdayData() {

    const phase =
        getNewsPhase();


    const matchdays =
        phase ===
            "qualification"
            ?
            leagueData
                .qualificationMatchdays
            :
            leagueData
                .mainRoundMatchdays;


    if (
        !Array.isArray(matchdays)
    ) {

        return null;

    }


    const realMatchdays =
        matchdays.filter(
            matchday => {

                if (
                    !matchday ||
                    !matchday.scores
                ) {

                    return false;

                }


                return Object.values(
                    matchday.scores
                )
                .some(
                    score =>
                        Number(score) > 0
                );

            }
        );


    if (
        realMatchdays.length === 0
    ) {

        return null;

    }


    return realMatchdays[
        realMatchdays.length - 1
    ];

}


/*
=========================================
MANAGER DER WOCHE
=========================================
*/


function getNewsManagersOfWeek() {

    const latestMatchday =
        getLatestNewsMatchdayData();


    if (
        !latestMatchday
    ) {

        return [];

    }


    const results =
        Object.entries(
            latestMatchday.scores
        )
        .map(
            (
                [
                    managerId,
                    rawScore
                ]
            ) => {

                return {

                    manager:
                        getNewsManagerById(
                            managerId
                        ),

                    score:
                        Number(rawScore)

                };

            }
        )
        .filter(
            result =>
                result.manager &&
                Number.isFinite(
                    result.score
                )
                &&
                result.score > 0
        );


    if (
        results.length === 0
    ) {

        return [];

    }


    const bestScore =
        Math.max(
            ...results.map(
                result =>
                    result.score
            )
        );


    return results.filter(
        result =>
            result.score ===
            bestScore
    );

}


/*
=========================================
WOCHEN-AUSZEICHNUNGEN
=========================================
*/


function renderNewsWeeklyAwards() {

    renderNewsManagerOfWeek();

    renderNewsRiser();

    renderNewsFaller();

}


/*
=========================================
MANAGER DER WOCHE RENDERN
=========================================
*/


function renderNewsManagerOfWeek() {

    const winners =
        getNewsManagersOfWeek();


    if (
        winners.length === 0
    ) {

        return;

    }


    const names =
        winners
            .map(
                result =>
                    result.manager.name
            )
            .join(" & ");


    const score =
        winners[0].score;


    setNewsText(
        "news-manager-of-week-name",
        names
    );


    setNewsText(
        "news-manager-of-week-value",
        `${formatNewsNumber(
            score
        )} PUNKTE`
    );


    if (
        winners.length === 1
    ) {

        setNewsText(
            "news-manager-of-week-description",
            "Stärkste Leistung des aktuellen Spieltags."
        );

    }

    else {

        setNewsText(
            "news-manager-of-week-description",
            `${winners.length} Manager teilen sich den höchsten Spieltagswert.`
        );

    }

}


/*
=========================================
TABELLENBEWEGUNGEN
=========================================
*/


function getNewsPositionMovements() {

    const phase =
        getNewsPhase();


    const competitionDefinitions =
        phase ===
            "qualification"
            ?
            [
                {
                    type:
                        "qualification",

                    name:
                        "A"
                },

                {
                    type:
                        "qualification",

                    name:
                        "B"
                }
            ]
            :
            [
                {
                    type:
                        "main-round",

                    name:
                        "champions-league"
                },

                {
                    type:
                        "main-round",

                    name:
                        "kreisliga"
                }
            ];


    const movements =
        [];


    competitionDefinitions.forEach(
        competition => {

            const managers =
                getNewsCompetitionManagers(
                    competition.type,
                    competition.name
                );


            if (
                managers.length === 0
            ) {

                return;

            }


            const matchdays =
                getNewsCompetitionMatchdays(
                    competition.type
                );


            const realMatchdays =
                getNewsRealMatchdays(
                    matchdays,
                    managers
                );


            if (
                realMatchdays.length < 2
            ) {

                return;

            }


            const previousMatchdays =
                realMatchdays.slice(
                    0,
                    -1
                );


            const currentPositions =
                calculateNewsStandingsAtMatchday(
                    managers,
                    realMatchdays
                );


            const previousPositions =
                calculateNewsStandingsAtMatchday(
                    managers,
                    previousMatchdays
                );


            managers.forEach(
                manager => {

                    const currentPosition =
                        currentPositions[
                            manager.id
                        ];


                    const previousPosition =
                        previousPositions[
                            manager.id
                        ];


                    if (
                        !currentPosition ||
                        !previousPosition
                    ) {

                        return;

                    }


                    movements.push({

                        manager:
                            manager,

                        competition:
                            competition,

                        previousPosition:
                            previousPosition,

                        currentPosition:
                            currentPosition,

                        movement:
                            previousPosition -
                            currentPosition

                    });

                }
            );

        }
    );


    return movements;

}


/*
=========================================
AUFSTEIGER DER WOCHE
=========================================
*/


function renderNewsRiser() {

    const movements =
        getNewsPositionMovements();


    if (
        movements.length === 0
    ) {

        return;

    }


    const biggestRise =
        Math.max(
            ...movements.map(
                item =>
                    item.movement
            )
        );


    if (
        biggestRise <= 0
    ) {

        setNewsText(
            "news-riser-name",
            "Keine Veränderung"
        );


        setNewsText(
            "news-riser-value",
            "±0 PLÄTZE"
        );


        setNewsText(
            "news-riser-description",
            "An der Spitze der Tabellen blieb es ruhig."
        );


        return;

    }


    const risers =
        movements.filter(
            item =>
                item.movement ===
                biggestRise
        );


    const names =
        risers
            .map(
                item =>
                    item.manager.name
            )
            .join(" & ");


    setNewsText(
        "news-riser-name",
        names
    );


    setNewsText(
        "news-riser-value",
        `+${biggestRise} ${
            biggestRise === 1
                ? "PLATZ"
                : "PLÄTZE"
        }`
    );


    const first =
        risers[0];


    setNewsText(
        "news-riser-description",
        `Von Platz ${first.previousPosition} auf Platz ${first.currentPosition} – stärkste Entwicklung der Woche.`
    );

}


/*
=========================================
ABSTURZ DER WOCHE
=========================================
*/


function renderNewsFaller() {

    const movements =
        getNewsPositionMovements();


    if (
        movements.length === 0
    ) {

        return;

    }


    const biggestFall =
        Math.min(
            ...movements.map(
                item =>
                    item.movement
            )
        );


    if (
        biggestFall >= 0
    ) {

        setNewsText(
            "news-faller-name",
            "Keine Veränderung"
        );


        setNewsText(
            "news-faller-value",
            "±0 PLÄTZE"
        );


        setNewsText(
            "news-faller-description",
            "Kein Manager verlor in dieser Woche einen Tabellenplatz."
        );


        return;

    }


    const fallers =
        movements.filter(
            item =>
                item.movement ===
                biggestFall
        );


    const names =
        fallers
            .map(
                item =>
                    item.manager.name
            )
            .join(" & ");


    setNewsText(
        "news-faller-name",
        names
    );


    setNewsText(
        "news-faller-value",
        `${biggestFall} ${
            Math.abs(
                biggestFall
            ) === 1
                ? "PLATZ"
                : "PLÄTZE"
        }`
    );


    const first =
        fallers[0];


    setNewsText(
        "news-faller-description",
        `Von Platz ${first.previousPosition} auf Platz ${first.currentPosition} – der größte Rückschlag des Spieltags.`
    );

}


/*
=========================================
TOPSTORY
=========================================
*/


function renderNewsHero() {

    const phase =
        getNewsPhase();


    const matchday =
        getNewsCurrentMatchday();


    /*
    Saison noch nicht gestartet.
    */

    if (
        matchday === 0
    ) {

        setNewsText(
            "news-hero-title",
            "DIE SAISON BEGINNT!"
        );


        setNewsText(
            "news-hero-description",
            "18 Manager starten in zwei Qualifikationsgruppen. Der Kampf um die neun Plätze in der Champions League beginnt."
        );


        setNewsHeroLink(
            "/kickbase-league/qualifikationsligen.html",
            "ZUR QUALIFIKATION"
        );


        return;

    }


    /*
    Hauptstory = aktuell stärkster
    Tabellenführer.
    */

    const leaders =
        getNewsCurrentLeaders();


    if (
        leaders.length === 0
    ) {

        return;

    }


    const leader =
        leaders
            .sort(
                (
                    a,
                    b
                ) =>
                    b.points -
                    a.points
            )[0];


    if (
        phase ===
        "qualification"
    ) {

        setNewsText(
            "news-hero-title",
            `${leader.manager.name.toUpperCase()} SETZT DAS AUSRUFEZEICHEN!`
        );


        setNewsText(
            "news-hero-description",
            `${leader.manager.name} führt aktuell die Qualifikation ${leader.competition} mit ${formatNewsNumber(
                leader.points
            )} Punkten an. Der Kampf um die Champions-League-Plätze nimmt Fahrt auf.`
        );


        setNewsHeroLink(
            "/kickbase-league/qualifikationsligen.html",
            "ZUR TABELLE"
        );

    }

    else if (
        leader.competition ===
        "Champions League"
    ) {

        setNewsText(
            "news-hero-title",
            `${leader.manager.name.toUpperCase()} ÜBERNIMMT DIE SPITZE!`
        );


        setNewsText(
            "news-hero-description",
            `${leader.manager.name} steht mit ${formatNewsNumber(
                leader.points
            )} Punkten an der Spitze der Champions League. Der Kampf um den größten Titel der Liga ist eröffnet.`
        );


        setNewsHeroLink(
            "/kickbase-league/champions-league.html",
            "ZUR TABELLE"
        );

    }

    else {

        setNewsText(
            "news-hero-title",
            `${leader.manager.name.toUpperCase()} AUF AUFSTIEGSKURS!`
        );


        setNewsText(
            "news-hero-description",
            `${leader.manager.name} führt mit ${formatNewsNumber(
                leader.points
            )} Punkten die Kreisliga an und setzt sich im Kampf um den Aufstieg an die Spitze.`
        );


        setNewsHeroLink(
            "/kickbase-league/kreisliga.html",
            "ZUR TABELLE"
        );

    }

}


/*
=========================================
AKTUELLE TABELLENFÜHRER
=========================================
*/


function getNewsCurrentLeaders() {

    const phase =
        getNewsPhase();


    const leaders =
        [];


    if (
        phase ===
        "qualification"
    ) {

        [
            "A",
            "B"
        ].forEach(
            groupName => {

                const ranking =
                    getNewsQualificationRanking(
                        groupName
                    );


                if (
                    ranking[0]
                ) {

                    leaders.push({

                        manager:
                            ranking[0],

                        points:
                            ranking[0]
                                .qualification
                                .points,

                        competition:
                            groupName

                    });

                }

            }
        );


        return leaders;

    }


    [
        {
            league:
                "champions-league",

            title:
                "Champions League"
        },

        {
            league:
                "kreisliga",

            title:
                "Kreisliga"
        }
    ].forEach(
        definition => {

            const ranking =
                getNewsMainRoundRanking(
                    definition.league
                );


            if (
                ranking[0]
            ) {

                leaders.push({

                    manager:
                        ranking[0],

                    points:
                        ranking[0]
                            .mainRound
                            .points,

                    competition:
                        definition.title

                });

            }

        }
    );


    return leaders;

}


/*
=========================================
HERO LINK
=========================================
*/


function setNewsHeroLink(
    href,
    text
) {

    const link =
        document.getElementById(
            "news-hero-link"
        );


    if (!link) {
        return;
    }


    link.href =
        href;


    link.innerHTML = `

        ${escapeNewsHTML(text)}

        <i
            data-lucide="chevron-right"
            aria-hidden="true"
        ></i>

    `;


    refreshNewsIcons();

}


/*
=========================================
LIGA PANELS
=========================================
*/


function renderNewsLeaguePanels() {

    const phase =
        getNewsPhase();


    if (
        phase ===
        "qualification"
    ) {

        renderQualificationNewsPanel(
            "A",
            "a"
        );


        renderQualificationNewsPanel(
            "B",
            "b"
        );


        setNewsText(
            "news-issue-leagues-label",
            "Qualifikation A & B"
        );


        return;

    }


    renderMainRoundNewsPanel(
        "champions-league",
        "a"
    );


    renderMainRoundNewsPanel(
        "kreisliga",
        "b"
    );


    setNewsText(
        "news-issue-leagues-label",
        "Champions League & Kreisliga"
    );

}


/*
=========================================
QUALI PANEL
=========================================
*/


function renderQualificationNewsPanel(
    groupName,
    side
) {

    const panel =
        document.getElementById(
            `news-league-panel-${side}`
        );


    if (
        panel
    ) {

        panel.classList.remove(
            "news-league-champions",
            "news-league-kreisliga"
        );


        panel.classList.add(
            `news-league-quali-${groupName.toLowerCase()}`
        );

    }


    setNewsText(
        `news-league-${side}-title`,
        `Qualifikation ${groupName}`
    );


    setNewsText(
        `news-league-${side}-subtitle`,
        "DER WEG IN DIE CHAMPIONS LEAGUE"
    );


    setNewsLucideIcon(
        `news-league-${side}-icon`,
        "route"
    );


    const link =
        document.getElementById(
            `news-league-${side}-link`
        );


    if (link) {

        link.href =
            "/kickbase-league/qualifikationsligen.html";

    }


    const ranking =
        getNewsQualificationRanking(
            groupName
        );


    renderNewsMiniTable(
        ranking,
        "qualification",
        `news-league-${side}-table`
    );


    renderQualificationStories(
        ranking,
        groupName,
        `news-league-${side}-stories`
    );

}


/*
=========================================
HAUPTRUNDEN PANEL
=========================================
*/


function renderMainRoundNewsPanel(
    leagueName,
    side
) {

    const isChampionsLeague =
        leagueName ===
        "champions-league";


    const title =
        isChampionsLeague
            ?
            "Champions League"
            :
            "Kreisliga";


    const subtitle =
        isChampionsLeague
            ?
            "DIE HÖCHSTE SPIELKLASSE"
            :
            "DER KAMPF UM DEN AUFSTIEG";


    const icon =
        isChampionsLeague
            ?
            "trophy"
            :
            "shield";


    const linkUrl =
        isChampionsLeague
            ?
            "/kickbase-league/champions-league.html"
            :
            "/kickbase-league/kreisliga.html";


    const panel =
        document.getElementById(
            `news-league-panel-${side}`
        );


    if (
        panel
    ) {

        panel.classList.remove(
            "news-league-quali-a",
            "news-league-quali-b"
        );


        panel.classList.add(
            isChampionsLeague
                ?
                "news-league-champions"
                :
                "news-league-kreisliga"
        );

    }


    setNewsText(
        `news-league-${side}-title`,
        title
    );


    setNewsText(
        `news-league-${side}-subtitle`,
        subtitle
    );


    setNewsLucideIcon(
        `news-league-${side}-icon`,
        icon
    );


    const link =
        document.getElementById(
            `news-league-${side}-link`
        );


    if (link) {

        link.href =
            linkUrl;

    }


    const ranking =
        getNewsMainRoundRanking(
            leagueName
        );


    renderNewsMiniTable(
        ranking,
        "mainRound",
        `news-league-${side}-table`
    );


    renderMainRoundStories(
        ranking,
        leagueName,
        `news-league-${side}-stories`
    );

}


/*
=========================================
MINI TOP-3 TABELLE
=========================================
*/


function renderNewsMiniTable(
    ranking,
    competitionKey,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    if (
        !ranking ||
        ranking.length === 0
    ) {

        container.innerHTML = `

            <p class="news-empty-text">
                Noch keine Tabelle verfügbar.
            </p>

        `;

        return;

    }


    container.innerHTML =
        ranking
            .slice(
                0,
                3
            )
            .map(
                (
                    manager,
                    index
                ) => {

                    const points =
                        manager[
                            competitionKey
                        ].points || 0;


                    return `

                        <a
                            class="news-mini-table-row"
                            href="/kickbase-league/manager-profil.html?id=${encodeURIComponent(
                                manager.id
                            )}"
                        >

                            <span>
                                ${index + 1}
                            </span>

                            <strong>
                                ${escapeNewsHTML(
                                    manager.name
                                )}
                            </strong>

                            <b>
                                ${formatNewsNumber(
                                    points
                                )}
                            </b>

                        </a>

                    `;

                }
            )
            .join("");

}


/*
=========================================
QUALI NEWS
=========================================
*/


function renderQualificationStories(
    ranking,
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


    if (
        ranking.length === 0
    ) {

        return;

    }


    const stories =
        [];


    const leader =
        ranking[0];


    stories.push(
        `${leader.name} führt Gruppe ${groupName} mit ${formatNewsNumber(
            leader.qualification.points
        )} Punkten an.`
    );


    if (
        ranking[3] &&
        ranking[4]
    ) {

        const difference =
            Math.abs(
                ranking[3]
                    .qualification
                    .points
                -
                ranking[4]
                    .qualification
                    .points
            );


        stories.push(
            `Zwischen Platz 4 und 5 liegen aktuell nur ${formatNewsNumber(
                difference
            )} Punkte.`
        );

    }


    const formManager =
        getNewsBestFormManager(
            ranking,
            "qualification"
        );


    if (
        formManager
    ) {

        stories.push(
            `${formManager.name} zeigt aktuell die stärkste Form der Gruppe.`
        );

    }


    container.innerHTML =
        stories
            .slice(
                0,
                3
            )
            .map(
                text => `

                    <p class="news-league-story">

                        <i
                            data-lucide="circle-dot"
                            aria-hidden="true"
                        ></i>

                        <span>
                            ${escapeNewsHTML(
                                text
                            )}
                        </span>

                    </p>

                `
            )
            .join("");


    refreshNewsIcons();

}


/*
=========================================
HAUPTRUNDEN NEWS
=========================================
*/


function renderMainRoundStories(
    ranking,
    leagueName,
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );


    if (
        !container ||
        ranking.length === 0
    ) {

        return;

    }


    const stories =
        [];


    const leader =
        ranking[0];


    stories.push(
        `${leader.name} führt mit ${formatNewsNumber(
            leader.mainRound.points
        )} Punkten die Tabelle an.`
    );


    if (
        ranking[0] &&
        ranking[1]
    ) {

        const difference =
            Math.abs(
                ranking[0]
                    .mainRound
                    .points
                -
                ranking[1]
                    .mainRound
                    .points
            );


        stories.push(
            `An der Spitze beträgt der Abstand aktuell ${formatNewsNumber(
                difference
            )} Punkte.`
        );

    }


    if (
        leagueName ===
        "champions-league"
        &&
        ranking[5] &&
        ranking[6]
    ) {

        const difference =
            Math.abs(
                ranking[5]
                    .mainRound
                    .points
                -
                ranking[6]
                    .mainRound
                    .points
            );


        stories.push(
            `Am Abstiegsstrich liegen zwischen Platz 6 und 7 nur ${formatNewsNumber(
                difference
            )} Punkte.`
        );

    }


    if (
        leagueName ===
        "kreisliga"
        &&
        ranking[2] &&
        ranking[3]
    ) {

        const difference =
            Math.abs(
                ranking[2]
                    .mainRound
                    .points
                -
                ranking[3]
                    .mainRound
                    .points
            );


        stories.push(
            `Im Aufstiegskampf trennen Platz 3 und 4 nur ${formatNewsNumber(
                difference
            )} Punkte.`
        );

    }


    container.innerHTML =
        stories
            .slice(
                0,
                3
            )
            .map(
                text => `

                    <p class="news-league-story">

                        <i
                            data-lucide="circle-dot"
                            aria-hidden="true"
                        ></i>

                        <span>
                            ${escapeNewsHTML(
                                text
                            )}
                        </span>

                    </p>

                `
            )
            .join("");


    refreshNewsIcons();

}


/*
=========================================
MANAGER NEWS
=========================================
*/


function renderNewsManagerStories() {

    const container =
        document.getElementById(
            "news-manager-grid"
        );


    if (!container) {
        return;
    }


    const stories =
        createAutomaticManagerNews();


    if (
        stories.length === 0
    ) {

        return;

    }


    container.innerHTML =
        stories
            .slice(
                0,
                6
            )
            .map(
                story => `

                    <a
                        class="news-manager-card"
                        href="/kickbase-league/manager-profil.html?id=${encodeURIComponent(
                            story.manager.id
                        )}"
                    >

                        <span
                            class="
                                news-manager-card-icon
                                ${story.className}
                            "
                        >

                            <i
                                data-lucide="${story.icon}"
                                aria-hidden="true"
                            ></i>

                        </span>


                        <div>

                            <strong>
                                ${escapeNewsHTML(
                                    story.manager.name
                                )}
                            </strong>

                            <p>
                                ${escapeNewsHTML(
                                    story.text
                                )}
                            </p>

                            <small>
                                mehr lesen
                                <i data-lucide="chevron-right"></i>
                            </small>

                        </div>

                    </a>

                `
            )
            .join("");


    refreshNewsIcons();

}


/*
=========================================
AUTOMATISCHE MANAGERSTORIES
=========================================
*/


function createAutomaticManagerNews() {

    const stories =
        [];


    const phase =
        getNewsPhase();


    const movements =
        getNewsPositionMovements();


    /*
    Tabellenführer
    */

    getNewsCurrentLeaders()
        .forEach(
            leader => {

                stories.push({

                    manager:
                        leader.manager,

                    icon:
                        "crown",

                    className:
                        "news-manager-icon-leader",

                    priority:
                        100,

                    text:
                        phase ===
                            "qualification"
                            ?
                            `Aktuell Tabellenführer in Qualifikation ${leader.competition}.`
                            :
                            `Aktuell Tabellenführer der ${leader.competition}.`

                });

            }
        );


    /*
    Tabellenbewegungen
    */

    movements.forEach(
        movement => {

            if (
                movement.movement >= 2
            ) {

                stories.push({

                    manager:
                        movement.manager,

                    icon:
                        "chevrons-up",

                    className:
                        "news-manager-icon-up",

                    priority:
                        75,

                    text:
                        `Springt um ${movement.movement} Plätze nach oben und steht jetzt auf Rang ${movement.currentPosition}.`

                });

            }


            if (
                movement.movement <= -2
            ) {

                stories.push({

                    manager:
                        movement.manager,

                    icon:
                        "trending-down",

                    className:
                        "news-manager-icon-down",

                    priority:
                        70,

                    text:
                        `Verliert ${Math.abs(
                            movement.movement
                        )} Plätze und fällt auf Rang ${movement.currentPosition} zurück.`

                });

            }

        }
    );


    /*
    Manager der Woche
    */

    getNewsManagersOfWeek()
        .forEach(
            result => {

                stories.push({

                    manager:
                        result.manager,

                    icon:
                        "star",

                    className:
                        "news-manager-icon-star",

                    priority:
                        90,

                    text:
                        `Mit ${formatNewsNumber(
                            result.score
                        )} Punkten liefert er den stärksten Spieltag der Woche.`

                });

            }
        );


    /*
    Doppelte Manager vermeiden.
    Höchste Priorität gewinnt.
    */

    const uniqueStories =
        new Map();


    stories
        .sort(
            (
                a,
                b
            ) =>
                b.priority -
                a.priority
        )
        .forEach(
            story => {

                if (
                    !uniqueStories.has(
                        story.manager.id
                    )
                ) {

                    uniqueStories.set(
                        story.manager.id,
                        story
                    );

                }

            }
        );


    return Array.from(
        uniqueStories.values()
    );

}


/*
=========================================
WEITERE NEWS
=========================================
*/


function renderNewsFeed() {

    const container =
        document.getElementById(
            "news-feed"
        );


    if (!container) {
        return;
    }


    const newsItems =
        [];


    /*
    =====================================
    MANUELLE TRANSFER-NEWS
    =====================================

    Später können wir in league-data.js
    zum Beispiel eintragen:

    newsTransfers: [
        {
            managerId: "ben",
            player: "Harry Kane",
            price: 42000000,
            image: "/kickbase-league/news/kane.jpg",
            text: "Ein echter Statement-Transfer."
        }
    ]
    */


    if (
        Array.isArray(
            leagueData.newsTransfers
        )
    ) {

        leagueData
            .newsTransfers
            .forEach(
                transfer => {

                    const manager =
                        getNewsManagerById(
                            transfer.managerId
                        );


                    if (
                        !manager
                    ) {
                        return;
                    }


                    const price =
                        Number(
                            transfer.price
                        ) || 0;


                    newsItems.push({

                        type:
                            "TRANSFER",

                        icon:
                            "repeat-2",

                        image:
                            transfer.image || "",

                        title:
                            transfer.title
                            ||
                            `${manager.name} verpflichtet ${transfer.player || "einen neuen Spieler"}${price > 0 ? ` für ${formatNewsMillionPrice(price)}` : ""}`,

                        text:
                            transfer.text
                            ||
                            "Ein neuer Transfer sorgt für Gesprächsstoff in der Kickbase League.",

                        priority:
                            90

                    });

                }
            );

    }


    /*
    =====================================
    MANUELLE SONDERNEWS
    =====================================
    */


    if (
        Array.isArray(
            leagueData.manualNews
        )
    ) {

        leagueData
            .manualNews
            .forEach(
                item => {

                    newsItems.push({

                        type:
                            item.type ||
                            "NEWS",

                        icon:
                            item.icon ||
                            "newspaper",

                        image:
                            item.image ||
                            "",

                        title:
                            item.title ||
                            "Kickbase League News",

                        text:
                            item.text ||
                            "",

                        priority:
                            Number(
                                item.priority
                            ) || 50

                    });

                }
            );

    }


    /*
    =====================================
    AUTOMATISCHE POKAL-NEWS
    =====================================
    */


    const cupStory =
        getNewsAutomaticCupStory();


    if (
        cupStory
    ) {

        newsItems.push(
            cupStory
        );

    }


    if (
        newsItems.length === 0
    ) {

        return;

    }


    container.innerHTML =
        newsItems
            .sort(
                (
                    a,
                    b
                ) =>
                    b.priority -
                    a.priority
            )
            .slice(
                0,
                8
            )
            .map(
                item =>
                    createNewsFeedItem(
                        item
                    )
            )
            .join("");


    refreshNewsIcons();

}


/*
=========================================
NEWSFEED ITEM
=========================================
*/


function createNewsFeedItem(
    item
) {

    return `

        <article class="news-feed-item">

            ${
                item.image
                    ?
                    `
                        <div class="news-feed-image">

                            <img
                                src="${escapeNewsHTML(
                                    item.image
                                )}"
                                alt="${escapeNewsHTML(
                                    item.title
                                )}"
                                loading="lazy"
                            >

                        </div>
                    `
                    :
                    `
                        <div class="news-feed-image news-feed-image-placeholder">

                            <i
                                data-lucide="${item.icon}"
                                aria-hidden="true"
                            ></i>

                        </div>
                    `
            }


            <div class="news-feed-content">

                <span class="news-feed-category">
                    ${escapeNewsHTML(
                        item.type
                    )}
                </span>


                <h3>
                    ${escapeNewsHTML(
                        item.title
                    )}
                </h3>


                <p>
                    ${escapeNewsHTML(
                        item.text
                    )}
                </p>

            </div>

        </article>

    `;

}


/*
=========================================
PROGNOSE UPDATE
=========================================
*/


function renderNewsPredictionUpdate() {

    const phase =
        getNewsPhase();


    if (
        phase ===
        "qualification"
    ) {

        renderNewsQualificationPrediction();

        return;

    }


    renderNewsMainRoundPrediction();

}


/*
=========================================
QUALI PROGNOSE
=========================================
*/


function renderNewsQualificationPrediction() {

    if (
        typeof calculateQualificationPrediction !==
        "function"
    ) {

        return;

    }


    const prediction =
        calculateQualificationPrediction();


    if (!prediction) {
        return;
    }


    const groupA =
        Object.values(
            prediction
        )
        .filter(
            result =>
                result.group ===
                "A"
        )
        .sort(
            (
                a,
                b
            ) =>
                b
                    .championsLeagueProbability
                -
                a
                    .championsLeagueProbability
        );


    const groupB =
        Object.values(
            prediction
        )
        .filter(
            result =>
                result.group ===
                "B"
        )
        .sort(
            (
                a,
                b
            ) =>
                b
                    .championsLeagueProbability
                -
                a
                    .championsLeagueProbability
        );


    if (
        groupA[0]
    ) {

        setNewsText(
            "news-prediction-a-label",
            "CL-FAVORIT · GRUPPE A"
        );


        setNewsText(
            "news-prediction-a-name",
            groupA[0].name
        );


        setNewsText(
            "news-prediction-a-value",
            `${formatNewsPercentage(
                groupA[0]
                    .championsLeagueProbability
            )}`
        );


        setNewsText(
            "news-prediction-a-description",
            "Champions-League-Chance"
        );

    }


    if (
        groupB[0]
    ) {

        setNewsText(
            "news-prediction-b-label",
            "CL-FAVORIT · GRUPPE B"
        );


        setNewsText(
            "news-prediction-b-name",
            groupB[0].name
        );


        setNewsText(
            "news-prediction-b-value",
            `${formatNewsPercentage(
                groupB[0]
                    .championsLeagueProbability
            )}`
        );


        setNewsText(
            "news-prediction-b-description",
            "Champions-League-Chance"
        );

    }


    setNewsText(
        "news-prediction-phase-note",
        "Während der Qualifikation werden hier die Champions-League-Chancen aus Gruppe A und Gruppe B angezeigt."
    );


    /*
    Für die Veränderung brauchen wir
    mindestens zwei echte Spieltage.

    Solange noch keine belastbare
    Veränderung berechnet werden kann,
    nutzen wir die Tabellenbewegung
    als Trendindikator.
    */

    renderNewsPredictionMoversFromTable();

}


/*
=========================================
HAUPTRUNDEN PROGNOSE
=========================================
*/


function renderNewsMainRoundPrediction() {

    if (
        typeof calculatePowerBasedMainRoundPrediction !==
        "function"
    ) {

        return;

    }


    const championsPrediction =
        calculatePowerBasedMainRoundPrediction(
            "champions-league"
        );


    const kreisligaPrediction =
        calculatePowerBasedMainRoundPrediction(
            "kreisliga"
        );


    if (
        championsPrediction
    ) {

        const championsRanking =
            Object.values(
                championsPrediction
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b
                        .championProbability
                    -
                    a
                        .championProbability
            );


        if (
            championsRanking[0]
        ) {

            setNewsText(
                "news-prediction-a-label",
                "MEISTERFAVORIT · CL"
            );


            setNewsText(
                "news-prediction-a-name",
                championsRanking[0]
                    .name
            );


            setNewsText(
                "news-prediction-a-value",
                formatNewsPercentage(
                    championsRanking[0]
                        .championProbability
                )
            );


            setNewsText(
                "news-prediction-a-description",
                "Meisterchance"
            );

        }

    }


    if (
        kreisligaPrediction
    ) {

        const kreisligaRanking =
            Object.values(
                kreisligaPrediction
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b
                        .promotionProbability
                    -
                    a
                        .promotionProbability
            );


        if (
            kreisligaRanking[0]
        ) {

            setNewsText(
                "news-prediction-b-label",
                "AUFSTIEGSFAVORIT · KL"
            );


            setNewsText(
                "news-prediction-b-name",
                kreisligaRanking[0]
                    .name
            );


            setNewsText(
                "news-prediction-b-value",
                formatNewsPercentage(
                    kreisligaRanking[0]
                        .promotionProbability
                )
            );


            setNewsText(
                "news-prediction-b-description",
                "Aufstiegschance"
            );

        }

    }


    setNewsText(
        "news-prediction-phase-note",
        "In der Hauptphase werden Meisterchance der Champions League und Aufstiegschance der Kreisliga ausgewertet."
    );


    renderNewsPredictionMoversFromTable();

}


/*
=========================================
PROGNOSE-TREND

Bis wir historische Prognosewerte
speichern, nutzen wir die tatsächliche
Tabellenbewegung als automatischen
Trendindikator.

Dadurch bleibt die Seite komplett
wartungsarm.
=========================================
*/


function renderNewsPredictionMoversFromTable() {

    const movements =
        getNewsPositionMovements();


    if (
        movements.length === 0
    ) {

        return;

    }


    const riser =
        [...movements]
            .sort(
                (
                    a,
                    b
                ) =>
                    b.movement -
                    a.movement
            )[0];


    const faller =
        [...movements]
            .sort(
                (
                    a,
                    b
                ) =>
                    a.movement -
                    b.movement
            )[0];


    if (
        riser &&
        riser.movement > 0
    ) {

        setNewsText(
            "news-prediction-winner-name",
            riser.manager.name
        );


        setNewsText(
            "news-prediction-winner-value",
            `+${riser.movement} ${
                riser.movement === 1
                    ? "Platz"
                    : "Plätze"
            }`
        );


        setNewsText(
            "news-prediction-winner-description",
            "Der positive Tabellen-Trend stärkt seine Ausgangslage."
        );

    }


    if (
        faller &&
        faller.movement < 0
    ) {

        setNewsText(
            "news-prediction-loser-name",
            faller.manager.name
        );


        setNewsText(
            "news-prediction-loser-value",
            `${faller.movement} ${
                Math.abs(
                    faller.movement
                ) === 1
                    ? "Platz"
                    : "Plätze"
            }`
        );


        setNewsText(
            "news-prediction-loser-description",
            "Der negative Tabellen-Trend verschlechtert seine Ausgangslage."
        );

    }

}


/*
=========================================
POKAL NEWS
=========================================
*/


function renderNewsCup() {

    const story =
        getNewsAutomaticCupStory();


    if (!story) {
        return;
    }


    setNewsText(
        "news-cup-title",
        story.title
    );


    setNewsText(
        "news-cup-description",
        story.text
    );

}


/*
=========================================
AUTOMATISCHE POKALSTORY
=========================================
*/


function getNewsAutomaticCupStory() {

    if (
        !leagueData.cup
    ) {

        return null;

    }


    const currentMatchday =
        getNewsCurrentBundesligaMatchday();


    const rounds = [

        {
            matches:
                leagueData.cup.final,

            label:
                "Finale"
        },

        {
            matches:
                leagueData.cup.semiFinals,

            label:
                "Halbfinale"
        },

        {
            matches:
                leagueData.cup.quarterFinals,

            label:
                "Viertelfinale"
        },

        {
            matches:
                leagueData.cup.roundOf16,

            label:
                "Achtelfinale"
        },

        {
            matches:
                leagueData.cup.preliminaryRound,

            label:
                "Vorrunde"
        }

    ];


    /*
    Als erstes schauen wir,
    welche Pokalrunde zuletzt
    stattgefunden hat.
    */

    for (
        const round of rounds
    ) {

        if (
            !Array.isArray(
                round.matches
            )
        ) {

            continue;

        }


        const relevantMatches =
            round.matches.filter(
                match =>
                    Number(
                        match.matchday
                    ) <=
                    currentMatchday
            );


        if (
            relevantMatches.length === 0
        ) {

            continue;

        }


        return {

            type:
                "POKAL",

            icon:
                "trophy",

            image:
                "",

            title:
                `${round.label} im Kickbase-Pokal`,

            text:
                `${relevantMatches.length} ${
                    relevantMatches.length === 1
                        ? "Duell steht"
                        : "Duelle stehen"
                } im Fokus des Pokalwettbewerbs.`,

            priority:
                70

        };

    }


    /*
    Nächste Pokalrunde ankündigen.
    */

    const futureRounds = [

        {
            matches:
                leagueData.cup.preliminaryRound,

            label:
                "Vorrunde"
        },

        {
            matches:
                leagueData.cup.roundOf16,

            label:
                "Achtelfinale"
        },

        {
            matches:
                leagueData.cup.quarterFinals,

            label:
                "Viertelfinale"
        },

        {
            matches:
                leagueData.cup.semiFinals,

            label:
                "Halbfinale"
        },

        {
            matches:
                leagueData.cup.final,

            label:
                "Finale"
        }

    ];


    for (
        const round of futureRounds
    ) {

        if (
            !Array.isArray(
                round.matches
            )
            ||
            !round.matches[0]
        ) {

            continue;

        }


        const matchday =
            Number(
                round.matches[0]
                    .matchday
            );


        if (
            matchday >
            currentMatchday
        ) {

            return {

                type:
                    "POKAL",

                icon:
                    "trophy",

                image:
                    "",

                title:
                    `${round.label} wirft seine Schatten voraus`,

                text:
                    `Am Bundesliga-Spieltag ${matchday} geht es im Kickbase-Pokal weiter.`,

                priority:
                    60

            };

        }

    }


    return null;

}


/*
=========================================
AKTUELLER BUNDESLIGA-SPIELTAG
=========================================
*/


function getNewsCurrentBundesligaMatchday() {

    const phase =
        getNewsPhase();


    if (
        phase ===
        "qualification"
    ) {

        return getLatestRealMatchdayNumber(
            leagueData
                .qualificationMatchdays
        );

    }


    const latest =
        getLatestRealMatchdayNumber(
            leagueData
                .mainRoundMatchdays
        );


    /*
    Wenn die Hauptphase mit
    Spieltag 1–20 gepflegt wird:
    +14 ergibt Bundesliga-Spieltag.
    */

    if (
        latest > 0 &&
        latest <= 20
    ) {

        return latest + 14;

    }


    return latest;

}


/*
=========================================
BESTE FORM
=========================================
*/


function getNewsBestFormManager(
    managers,
    competitionKey
) {

    let bestManager =
        null;

    let bestAverage =
        -Infinity;


    managers.forEach(
        manager => {

            const scores =
                manager[
                    competitionKey
                ] &&
                Array.isArray(
                    manager[
                        competitionKey
                    ].scores
                )
                    ?
                    manager[
                        competitionKey
                    ].scores
                    :
                    [];


            const realScores =
                scores
                    .map(
                        score =>
                            Number(score)
                    )
                    .filter(
                        score =>
                            Number.isFinite(
                                score
                            )
                            &&
                            score > 0
                    )
                    .slice(
                        -3
                    );


            if (
                realScores.length === 0
            ) {

                return;

            }


            const average =
                realScores.reduce(
                    (
                        total,
                        score
                    ) =>
                        total +
                        score,
                    0
                )
                /
                realScores.length;


            if (
                average >
                bestAverage
            ) {

                bestAverage =
                    average;

                bestManager =
                    manager;

            }

        }
    );


    return bestManager;

}


/*
=========================================
QUALI RANKING
=========================================
*/


function getNewsQualificationRanking(
    groupName
) {

    return leagueData.managers
        .filter(
            manager =>
                manager
                    .qualification
                    .group ===
                groupName
        )
        .sort(
            (
                a,
                b
            ) => {

                const pointsDifference =
                    b
                        .qualification
                        .points
                    -
                    a
                        .qualification
                        .points;


                if (
                    pointsDifference !== 0
                ) {

                    return pointsDifference;

                }


                return a.name.localeCompare(
                    b.name,
                    "de"
                );

            }
        );

}


/*
=========================================
HAUPTRUNDEN RANKING
=========================================
*/


function getNewsMainRoundRanking(
    leagueName
) {

    return leagueData.managers
        .filter(
            manager =>
                manager
                    .mainRound
                    .league ===
                leagueName
        )
        .sort(
            (
                a,
                b
            ) => {

                const pointsDifference =
                    b
                        .mainRound
                        .points
                    -
                    a
                        .mainRound
                        .points;


                if (
                    pointsDifference !== 0
                ) {

                    return pointsDifference;

                }


                return a.name.localeCompare(
                    b.name,
                    "de"
                );

            }
        );

}


/*
=========================================
MANAGER EINER COMPETITION
=========================================
*/


function getNewsCompetitionManagers(
    type,
    name
) {

    if (
        type ===
        "qualification"
    ) {

        return leagueData.managers.filter(
            manager =>
                manager
                    .qualification
                    .group ===
                name
        );

    }


    return leagueData.managers.filter(
        manager =>
            manager
                .mainRound
                .league ===
            name
    );

}


/*
=========================================
SPIELTAGE EINER COMPETITION
=========================================
*/


function getNewsCompetitionMatchdays(
    type
) {

    if (
        type ===
        "qualification"
    ) {

        return leagueData
            .qualificationMatchdays;

    }


    return leagueData
        .mainRoundMatchdays;

}


/*
=========================================
ECHTE SPIELTAGE
=========================================
*/


function getNewsRealMatchdays(
    matchdays,
    managers
) {

    if (
        !Array.isArray(matchdays)
    ) {

        return [];

    }


    return matchdays.filter(
        matchday => {

            if (
                !matchday ||
                !matchday.scores
            ) {

                return false;

            }


            return managers.some(
                manager =>
                    Number(
                        matchday.scores[
                            manager.id
                        ]
                    ) > 0
            );

        }
    );

}


/*
=========================================
TABELLE NACH X SPIELTAGEN
=========================================
*/


function calculateNewsStandingsAtMatchday(
    managers,
    matchdays
) {

    const totals =
        {};


    managers.forEach(
        manager => {

            totals[
                manager.id
            ] = 0;

        }
    );


    matchdays.forEach(
        matchday => {

            managers.forEach(
                manager => {

                    const score =
                        Number(
                            matchday
                                .scores[
                                    manager.id
                                ]
                        );


                    if (
                        Number.isFinite(
                            score
                        )
                        &&
                        score > 0
                    ) {

                        totals[
                            manager.id
                        ] +=
                            score;

                    }

                }
            );

        }
    );


    const ranking =
        [...managers]
            .sort(
                (
                    a,
                    b
                ) => {

                    const difference =
                        totals[
                            b.id
                        ]
                        -
                        totals[
                            a.id
                        ];


                    if (
                        difference !== 0
                    ) {

                        return difference;

                    }


                    return a
                        .name
                        .localeCompare(
                            b.name,
                            "de"
                        );

                }
            );


    const positions =
        {};


    ranking.forEach(
        (
            manager,
            index
        ) => {

            positions[
                manager.id
            ] =
                index + 1;

        }
    );


    return positions;

}


/*
=========================================
MANAGER SUCHEN
=========================================
*/


function getNewsManagerById(
    managerId
) {

    return leagueData.managers.find(
        manager =>
            manager.id ===
            managerId
    ) || null;

}


/*
=========================================
PREIS FORMATIEREN
=========================================
*/


function formatNewsMillionPrice(
    value
) {

    const millions =
        Number(value)
        /
        1000000;


    return (
        millions
            .toLocaleString(
                "de-DE",
                {
                    minimumFractionDigits:
                        millions % 1 === 0
                            ?
                            0
                            :
                            1,

                    maximumFractionDigits:
                        1
                }
            )
        +
        " Mio. €"
    );

}


/*
=========================================
ZAHL FORMATIEREN
=========================================
*/


function formatNewsNumber(
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
PROZENT FORMATIEREN
=========================================
*/


function formatNewsPercentage(
    value
) {

    return (
        Number(value)
            .toLocaleString(
                "de-DE",
                {
                    minimumFractionDigits:
                        1,

                    maximumFractionDigits:
                        1
                }
            )
        +
        " %"
    );

}


/*
=========================================
TEXT SETZEN
=========================================
*/


function setNewsText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (
        element
    ) {

        element.textContent =
            value;

    }

}


/*
=========================================
ICON SETZEN
=========================================
*/


function setNewsLucideIcon(
    elementId,
    icon
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.setAttribute(
        "data-lucide",
        icon
    );


    refreshNewsIcons();

}


/*
=========================================
HTML ABSICHERN
=========================================
*/


function escapeNewsHTML(
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


function refreshNewsIcons() {

    if (
        window.lucide &&
        typeof window
            .lucide
            .createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}