const toggleBtn = document.getElementById('toggle-theme');

const updateToggleButton = (theme) => {
    toggleBtn.textContent = theme === 'dark' ? '🌞 Light Theme' : '🌙 Dark Theme';
};

toggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);

    // Save new theme to localStorage
    localStorage.setItem('theme', newTheme);

    // Update button text
    updateToggleButton(newTheme);
});

// On page load, set theme from localStorage if it exists
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    // Update button text
    updateToggleButton(theme);
};

// Get input, clear button, search button, and search icon elements
const inputField = document.querySelector('.input');
const clearButton = document.querySelector('.x-icon');
const searchButton = document.querySelector('.btn-bootstrap');
const searchIcon = document.querySelector('.search-icon');
const navbarBrand = document.querySelector('.container-fluid .navbar-brand');

// Function to perform the search
function performSearch() {
    const query = inputField.value.trim(); // Get the search input
    if (query) {
        // Perform an action with the search query (e.g., redirect within site)
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else {
        alert("Please enter a search term.");
    }
}

// Add event listener to the clear button
clearButton.addEventListener('click', function () {
    inputField.value = ''; // Clears the input field
    inputField.focus();    // Optional: Focus back on the input
});

// Add event listener to the search icon
searchIcon.addEventListener('click', function () {
    inputField.focus(); // Focus the input field
});

// Add event listener for the search button
searchButton.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    performSearch(); // Trigger the search
});

// Add event listener to trigger search on 'Enter' keypress
inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { // Check if the Enter key was pressed
        e.preventDefault(); // Prevent default form submission behavior
        performSearch(); // Trigger the search
    }
});

function isScreenWidthBelow385() {
    return window.innerWidth < 385;
}

inputField.addEventListener('focus', () => {
    if (isScreenWidthBelow385()) {
        navbarBrand.classList.add('hidden'); // Add the hidden class
    }
});

inputField.addEventListener('blur', () => {
    if (isScreenWidthBelow385()) {
        navbarBrand.classList.remove('hidden'); // Remove the hidden class
    }
});

// Get the second navbar
var navbar2 = document.getElementById("navbar2");

// Get the offset position of the second navbar
var sticky = navbar2.offsetTop;

// Add scroll event to the window
window.onscroll = function () {
    toggleStickyNavbar();
};

// Function to toggle the sticky class based on scroll position
function toggleStickyNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar2.classList.add("sticky");
    } else {
        navbar2.classList.remove("sticky");
    }
}

window.addEventListener("load", function () {
    // Add 'loaded' class to body once the page is fully loaded
    document.body.classList.add("loaded");
});

// window.addEventListener("load", function () {
//     // Simulate a delay (e.g., 3 seconds)
//     setTimeout(function () {
//         document.body.classList.add("loaded");
//     }, 3000); // 3000ms = 3 seconds delay
// });
// For checking the functioning of the loader
