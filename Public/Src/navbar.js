window.onscroll = () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolling-navbar");
    } else {
        navbar.classList.remove("scrolling-navbar");
    }
};