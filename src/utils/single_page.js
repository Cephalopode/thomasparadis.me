export function singlePageFeatures() {
    // activate if visible
    const burger = document.getElementById("navbar-burger");
    burger.addEventListener("click", () => {
        burger.classList.toggle("is-active");
        document
            .getElementById(burger.dataset.target)
            .classList.toggle("is-active");
    });
    const navItems = document.getElementById("menubar").firstElementChild
        .children,
        navSections = new Array(navItems.length);
    for (let i = 0; i < navItems.length; i++)
        navSections[i] = document.getElementById(navItems[i].dataset.target);

    const menuBarHeight = document.getElementById("menubar").offsetHeight;
    function isVisible(ele) {
        const r = ele.getBoundingClientRect();
        const h = window.innerHeight || document.documentElement.clientHeight;
        const w = window.innerWidth || document.documentElement.clientWidth;
        return (
            r.top <= h &&
            r.top + r.height - menuBarHeight >= 0 &&
            r.left <= h &&
            r.left + r.width >= 0
        );
    }
    function activateIfVisible() {
        for (let b = true, i = 0; i < navItems.length; i++) {
            if (b && isVisible(navSections[i])) {
                navItems[i].classList.add("is-active");
                b = false;
            } else navItems[i].classList.remove("is-active");
        }
    }
    var isTicking = null;
    window.addEventListener(
        "scroll",
        () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    activateIfVisible();
                    isTicking = false;
                });
                isTicking = true;
            }
        },
        false
    );
    //smooth scroll
    for (let item of navItems) {
        item.addEventListener("click", e => {
            e.preventDefault();
            window.scroll({
                behavior: "smooth",
                left: 0,
                top:
                    document
                        .getElementById(e.target.dataset.target)
                        .getBoundingClientRect().top + window.scrollY
            });
        });
    }
}