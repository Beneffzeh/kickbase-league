document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", function () {

    const revealSelectors = [
        ".portal-intro",
        ".league-facts",
        ".portal-section",
        ".portal-card",
        ".season-note",
        ".hero",
        ".container",
        ".card",
        ".saison",
        ".info-box",
        ".hof-intro",
        ".hof-card",
        ".hof-record",
        ".hof-note",
        ".stats-intro",
        ".stats-block",
        ".stats-card",
        ".stats-note",
        ".pokal-info-item",
        ".pokal-termin",
        ".vorrunden-grid",
        ".turnier-runde"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(",")
    );

    revealElements.forEach(function (element, index) {

        element.classList.add("reveal-element");

        const delayNumber = (index % 4) + 1;

        element.classList.add(
            "reveal-delay-" + delayNumber
        );

    });

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {
            element.classList.add("reveal-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function (entries, currentObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    currentObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -45px 0px"
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

});