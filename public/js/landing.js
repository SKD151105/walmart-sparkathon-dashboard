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

const loginOverlay = document.querySelector('.login-overlay');
const loginBtn = document.getElementById('login');
const signupCta = document.querySelector('.btn-signup-cta');

loginBtn.addEventListener('click', () => {
    loginOverlay.style.display = 'flex';
});

loginOverlay.addEventListener('click', e => {
    if (!e.target.closest('.login-container')) {
        loginOverlay.style.display = 'none';
    }
});

signupCta.addEventListener('click', () => {
    loginOverlay.style.display = 'none';
    document.querySelector('.signup').style.display = 'flex';
});

// const toggleBtn = document.getElementById("theme-toggle");
// const html = document.documentElement;

// const savedTheme = localStorage.getItem("theme");
// if (savedTheme) html.setAttribute("data-theme", savedTheme);

// toggleBtn.addEventListener("click", () => {
//     const currentTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
//     html.setAttribute("data-theme", currentTheme);
//     localStorage.setItem("theme", currentTheme);

//     toggleBtn.innerHTML = currentTheme === "dark"
//         ? `<i class="fas fa-sun"></i>`
//         : `<i class="fas fa-moon"></i>`;
// });

// const current = html.getAttribute("data-theme") || "light";
// toggleBtn.innerHTML = current === "dark"
//     ? `<i class="fas fa-sun"></i>`
//     : `<i class="fas fa-moon"></i>`;

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        this.parentElement.classList.toggle('open');
    });
});

