window.onload = () => {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
        window.scrollTo(0, 0);
    }
};

const signupBtn = document.getElementById('signup');
const signupOverlay = document.querySelector('.signup');
const signupBox = signupOverlay.querySelector('.signup-container');

signupBtn.addEventListener('click', () => {
    signupOverlay.style.display = 'flex';  
});

signupOverlay.addEventListener('click', (evt) => {
    if (!signupBox.contains(evt.target)) {
        signupOverlay.style.display = 'none';
    }
});
