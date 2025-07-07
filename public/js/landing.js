// JS for landing page interactivity
window.onload = () => {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
        window.scrollTo(0, 0);
    }
};
