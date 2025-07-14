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

window.addEventListener("DOMContentLoaded", () => {
    const loginOverlay = document.querySelector('.login-overlay');
    const loginBtn = document.getElementById('login');
    const adminLoginLink = document.getElementById('admin-login-link');
    const signupCta = document.querySelector('.btn-signup-cta');

    // Intercept anchor click
    adminLoginLink.addEventListener('click', (e) => {
        e.preventDefault(); // prevent jump to #admin-login
        loginOverlay.style.display = 'flex';
    });

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
});

window.addEventListener('load', () => {
    if (window.location.hash === '#admin-login') {
        history.replaceState(null, null, window.location.pathname + window.location.search);
        window.scrollTo(0, 0); // reset scroll
    }
});

// const signupForm = document.querySelector('.signup-form');

// signupForm.addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent default form submission

//     document.querySelectorAll('.error-msg').forEach(el => el.remove());
//     signupForm.querySelectorAll('input, select').forEach(el => {
//         el.style.borderBottom = '1px solid #ccc';
//     });

//     let isValid = true;

//     const showError = (element, message) => {
//         element.style.borderBottom = '2px solid red';
//         const error = document.createElement('div');
//         error.className = 'error-msg';
//         error.style.color = 'red';
//         error.style.fontSize = '0.8rem';
//         error.style.marginTop = '4px';
//         error.textContent = message;
//         element.insertAdjacentElement('afterend', error);
//         isValid = false;
//     };

//     const name = document.getElementById('name');
//     const gender = document.getElementById('gender');
//     const occupation = document.getElementById('occupation');
//     const wid = document.getElementById('wid');
//     const email = document.getElementById('email');
//     const pw1 = document.getElementById('pw1');
//     const pw2 = document.getElementById('pw2');

//     if (name.value.trim() === '') showError(name, 'Name is required.');
//     if (gender.value.trim() === '') showError(gender, 'Gender is required.');
//     if (occupation.value === '') showError(occupation, 'Please select an occupation.');
//     if (!/^W-\d{5}$/i.test(wid.value.trim())) showError(wid, 'Walmart ID format must be like W-12345.');
//     if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) showError(email, 'Invalid email format.');
//     if (pw1.value.length < 6) showError(pw1, 'Password must be at least 6 characters.');
//     if (pw1.value !== pw2.value) showError(pw2, 'Passwords do not match.');

//     if (isValid) {
//         signupForm.submit();
//     }
// });
