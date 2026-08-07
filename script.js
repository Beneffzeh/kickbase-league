document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("mobile-menu-button");
    const closeButton = document.getElementById("mobile-menu-close");
    const sideMenu = document.getElementById("mobile-side-menu");
    const overlay = document.getElementById("mobile-menu-overlay");

    if (!menuButton || !closeButton || !sideMenu || !overlay) {
        return;
    }

    function openMenu() {
        menuButton.classList.add("is-open");
        sideMenu.classList.add("is-open");
        overlay.classList.add("is-open");

        menuButton.setAttribute("aria-expanded", "true");
        sideMenu.setAttribute("aria-hidden", "false");

        document.body.classList.add("mobile-menu-open");
    }

    function closeMenu() {
        menuButton.classList.remove("is-open");
        sideMenu.classList.remove("is-open");
        overlay.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        sideMenu.setAttribute("aria-hidden", "true");

        document.body.classList.remove("mobile-menu-open");
    }

    function toggleMenu() {
        const isOpen = sideMenu.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    menuButton.addEventListener("click", toggleMenu);
    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });

    closeMenu();
});

/* =========================================================
   SERVICE WORKER REGISTRIEREN
========================================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registration =
                await navigator.serviceWorker.register(
                    "/kickbase-league/service-worker.js",
                    {
                        scope: "/kickbase-league/",
                        updateViaCache: "none"
                    }
                );


            /*
            Bei jedem Start nach einer neuen Version suchen.
            */

            registration.update();


            console.log(
                "Kickbase-League-App wurde erfolgreich registriert."
            );

        } catch (error) {

            console.error(
                "Service Worker konnte nicht registriert werden:",
                error
            );

        }

    });

}
/* =========================================================
   LEGENDEN-SEITE ZUR NAVIGATION HINZUFÜGEN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const legendsUrl =
        "/kickbase-league/legenden.html";


    /*
    =====================================================
    DESKTOP-NAVIGATION
    =====================================================
    */

    document
        .querySelectorAll(".desktop-navigation")
        .forEach(navigation => {

            /*
            Nicht doppelt hinzufügen.
            */

            if (
                navigation.querySelector(
                    'a[href="/kickbase-league/legenden.html"]'
                )
            ) {
                return;
            }


            const hallOfFameLink =
                navigation.querySelector(
                    'a[href="/kickbase-league/hall-of-fame.html"]'
                );


            if (!hallOfFameLink) {
                return;
            }


            const legendsLink =
                document.createElement("a");


            legendsLink.href =
                legendsUrl;

            legendsLink.textContent =
                "Legenden";


            /*
            Auf der Legenden-Seite aktiv markieren.
            */

            if (
                window.location.pathname.endsWith(
                    "/legenden.html"
                )
            ) {

                legendsLink.classList.add(
                    "active-navigation-link"
                );

            }


            hallOfFameLink.insertAdjacentElement(
                "afterend",
                legendsLink
            );

        });


    /*
    =====================================================
    MOBILE NAVIGATION
    =====================================================
    */

    document
        .querySelectorAll(".mobile-side-menu-content")
        .forEach(navigation => {

            if (
                navigation.querySelector(
                    'a[href="/kickbase-league/legenden.html"]'
                )
            ) {
                return;
            }


            const hallOfFameLink =
                navigation.querySelector(
                    'a[href="/kickbase-league/hall-of-fame.html"]'
                );


            if (!hallOfFameLink) {
                return;
            }


            const legendsLink =
                document.createElement("a");


            legendsLink.href =
                legendsUrl;

            legendsLink.className =
                "mobile-menu-link";


            legendsLink.innerHTML = `

    <span class="mobile-menu-icon">
        <i data-lucide="sparkles"></i>
    </span>

    <div>

        <strong>Legenden</strong>

        <small>Karriere-Rangliste</small>

    </div>

    <i data-lucide="chevron-right"></i>

`;


            /*
            Auf der Legenden-Seite aktiv markieren.
            */

            if (
                window.location.pathname.endsWith(
                    "/legenden.html"
                )
            ) {

                legendsLink.classList.add(
                    "active-mobile-menu-link"
                );

            }


            hallOfFameLink.insertAdjacentElement(
                "afterend",
                legendsLink
            );

        });


    /*
    Neue Lucide-Icons laden.
    */

    if (
        typeof lucide !==
        "undefined"
    ) {

        lucide.createIcons();

    }

});