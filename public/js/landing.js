window.onload = () => {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
        window.scrollTo(0, 0);
    }
};

// SIGNUP MODAL
const signupBtn = document.getElementById('signup');
const signupOverlay = document.querySelector('.signup');
const signupBox = signupOverlay.querySelector('.signup-container');
const loginCta = document.querySelector('#s-login');

signupBtn.addEventListener('click', () => {
    signupOverlay.style.display = 'flex';
});

signupOverlay.addEventListener('click', (evt) => {
    if (!signupBox.contains(evt.target)) {
        signupOverlay.style.display = 'none';
    }
});

loginCta.addEventListener('click', () => {
    signupOverlay.style.display = 'none';
    document.querySelector('.login-overlay').style.display = 'flex';
});

// LOGIN MODAL
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

// // THEME TOGGLING  
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

// FORM VALIDATION FOR SIGNUP
const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent default form submission

    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    signupForm.querySelectorAll('input, select').forEach(el => {
        el.style.borderBottom = '1px solid #ccc';
    });

    let isValid = true;

    const showError = (element, message) => {
        element.style.borderBottom = '2px solid red';

        const error = document.createElement('div');
        error.className = 'error-msg';
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '4px';
        error.textContent = message;

        element.insertAdjacentElement('afterend', error);
        isValid = false;
    };

    const name = document.getElementById('name');
    const gender = document.getElementById('gender');
    const occupation = document.getElementById('occupation');
    const wid = document.getElementById('wid');
    const email = document.getElementById('email');
    const pw1 = document.getElementById('pw1');
    const pw2 = document.getElementById('pw2');

    // Validation rules
    if (name.value.trim() === '') showError(name, 'Name is required.');
    if (gender.value.trim() === '') showError(gender, 'Gender is required.');
    if (occupation.value === '') showError(occupation, 'Please select an occupation.');
    if (!/^W-\d{5}$/i.test(wid.value.trim())) showError(wid, 'ID format must be like W-12345.');
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) showError(email, 'Invalid email format.');
    if (pw1.value.length < 6) showError(pw1, 'Password must be at least 6 characters.');
    if (pw1.value !== pw2.value) showError(pw2, 'Passwords do not match.');

    if (isValid) {
        console.log("Form is valid! You can now submit.");
        signupForm.submit();
    }
});

// FORM VALIDATION FOR LOGIN
const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    loginForm.querySelectorAll('.error-msg').forEach(el => el.remove());
    loginForm.querySelectorAll('input').forEach(el => {
        el.style.borderBottom = '1px solid #ccc';
    });

    let isValid = true;

    const showError = (input, message) => {
        input.style.borderBottom = '2px solid red';

        const error = document.createElement('div');
        error.className = 'error-msg';
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '4px';
        error.textContent = message;

        input.insertAdjacentElement('afterend', error);
        isValid = false;
    };

    const wid = document.getElementById('wid-login');
    const password = document.getElementById('pw-login');

    if (!/^W-\d{5}$/i.test(wid.value.trim())) {
        showError(wid, 'Walmart ID must be like W-12345.');
    }

    if (password.value.trim().length < 6) {
        showError(password, 'Password must be at least 6 characters.');
    }

    if (isValid) {
        console.log('Login form valid! You may proceed.');
        loginForm.submit();
    }
});

window.onload = () => {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
        window.scrollTo(0, 0);
    }

    const heroLoginBtn = document.getElementById("hero-login");
    if (heroLoginBtn) {
        heroLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginOverlay.style.display = "flex";
        });
    }
};
