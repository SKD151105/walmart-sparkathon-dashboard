// const toggleBtn = document.getElementById('toggle-theme');

// toggleBtn.addEventListener('click', () => {
//     const html = document.documentElement;
//     const currentTheme = html.getAttribute('data-theme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//     html.setAttribute('data-theme', newTheme);
// });

// PROFILE DROPDOWN 
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
    dropdownProfile.classList.toggle('show');
});

document.addEventListener('click', (evt) => {
    // if dropdown is open AND click is outside the profile element
    if (dropdownProfile.classList.contains('show') &&
        !profile.contains(evt.target)) {
        dropdownProfile.classList.remove('show');
    }
});

