function setFaviconBasedOnTheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const faviconLink = document.getElementById("favicon-light");

    if (prefersDarkScheme) {
        faviconLink.href = "assets/images/common/favicon/light_favicon.png";
    } else {
        faviconLink.href = "assets/images/common/favicon/dark_favicon.png";
    }
}

window.addEventListener('load', setFaviconBasedOnTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', setFaviconBasedOnTheme);