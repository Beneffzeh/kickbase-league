document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("mobile-menu-button");
    const closeButton = document.getElementById("mobile-menu-close");
    const sideMenu = document.getElementById("mobile-side-menu");
    const overlay = document.getElementById("mobile-menu-overlay");

    if (!menuButton || !closeButton || !sideMenu || !overlay) {
        return;
    }

    function closeMenu() {
        menuButton.classList.remove("is-open");
        sideMenu.classList.remove("is-open");
        overlay.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        sideMenu.setAttribute("aria-hidden", "true");

        document.body.classList.remove("mobile-menu-open");
    }

    menuButton.addEventListener("click", closeMenu);
    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    closeMenu();
});