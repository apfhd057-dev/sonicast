/* ==================================================
   DESKTOP DROP-DOWN MENU
   메인페이지 menu.js와 동일한 동작
================================================== */
$(document).ready(function () {
    "use strict";

    const $header = $("#header");
    const $subMenus = $("#nav .sub");
    const $subArea = $(".submn_area");

    function closeDesktopMenu() {
        $subMenus.stop(true, true).hide();

        $subArea
            .stop(true, true)
            .css({ height: 0 })
            .hide();
    }

    function openDesktopMenu() {
        if (window.innerWidth <= 1024) {
            closeDesktopMenu();
            return;
        }

        $subArea
            .stop(true, true)
            .show()
            .animate({ height: 300 }, 200);

        $subMenus
            .stop(true, true)
            .fadeIn(150);
    }

    closeDesktopMenu();

    $header.on("mouseenter.desktopMenu", openDesktopMenu);

    $header.on("mouseleave.desktopMenu", function () {
        if (window.innerWidth <= 1024) {
            closeDesktopMenu();
            return;
        }

        $subMenus
            .stop(true, true)
            .fadeOut(100);

        $subArea
            .stop(true, true)
            .delay(50)
            .animate({ height: 0 }, 150, function () {
                $(this).hide();
            });
    });

    $(window).on("resize.desktopMenu", function () {
        if (window.innerWidth <= 1024) {
            closeDesktopMenu();
        }
    });
});

/* ==================================================
   MOBILE SITEMAP
   메인페이지 menu.js와 동일한 동작
================================================== */
(function () {
    "use strict";

    const openButton = document.querySelector(".hamburger_btn");
    const sitemap = document.getElementById("mobileSitemap");
    const closeButton = document.querySelector(".mobile_close_btn");
    const mobileLinks = document.querySelectorAll(".mobile_sitemap a");

    if (!openButton || !sitemap || !closeButton) return;

    function openMenu() {
        sitemap.classList.add("is-open");
        sitemap.setAttribute("aria-hidden", "false");
        openButton.setAttribute("aria-expanded", "true");
        openButton.setAttribute("aria-label", "전체 메뉴 닫기");
        document.body.classList.add("menu-open");

        requestAnimationFrame(function () {
            closeButton.focus();
        });
    }

    function closeMenu() {
        sitemap.classList.remove("is-open");
        sitemap.setAttribute("aria-hidden", "true");
        openButton.setAttribute("aria-expanded", "false");
        openButton.setAttribute("aria-label", "전체 메뉴 열기");
        document.body.classList.remove("menu-open");
    }

    openButton.addEventListener("click", function () {
        if (sitemap.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeButton.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && sitemap.classList.contains("is-open")) {
            closeMenu();
            openButton.focus();
        }
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (this.getAttribute("href") !== "#") {
                closeMenu();
            }
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
})();

/* ==================================================
   FAMILY SITE
================================================== */
(function () {
    "use strict";

    const familySelect = document.querySelector("#footer .family_site select");

    if (!familySelect) return;

    familySelect.addEventListener("change", function () {
        if (!this.value) return;

        window.open(this.value, "_blank", "noopener,noreferrer");
        this.selectedIndex = 0;
    });
})();
