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

// MENU 
const allMenu = document.querySelectorAll('main .content-data .head .menu');
allMenu.forEach(item => {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    icon.addEventListener('click', function () {
        menuLink.classList.toggle('show');
    });
});

imgProfile.addEventListener('click', function () {
    dropdownProfile.classList.toggle('show');
});

window.addEventListener('click', (evt) => {
    // if dropdown is open AND click is outside the profile element
    if (dropdownProfile.classList.contains('show') &&
        !profile.contains(evt.target)) {
        dropdownProfile.classList.remove('show');
    }
    allMenu.forEach(item => {
        const icon = item.querySelector('.icon');
        const menuLink = item.querySelector('.menu-link');

        if (evt.target !== icon) {
            if (evt.target !== menuLink) {
                if (menuLink.classList.contains('show')) {
                    menuLink.classList.remove('show');
                }
            }
        }
    });
});

// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress')

allProgress.forEach(item => {
    item.style.setProperty('--value', item.dataset.value)
});

// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const sidebar = document.getElementById('sidebar');
const allsideDividers = document.querySelectorAll('#sidebar .divider')

toggleSidebar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');

    if (sidebar.classList.contains('hide')) {
        allsideDividers.forEach(item => {
            item.textContent = '-';
        });
    } else {
        allsideDividers.forEach(item => {
            item.textContent = item.dataset.text;
        });
    }
});

// THEME TOGGLING
const toggleBtn = document.getElementById("toggle-theme");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
} else {
    html.setAttribute("data-theme", "light");
    updateIcon("light");
}

toggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    toggleBtn.classList.remove("fa-sun", "fa-moon");
    toggleBtn.classList.add(theme === "dark" ? "fa-sun" : "fa-moon");
}

// APEXCHARTS.JS
var options = {
    series: [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ],
    chart: {
        height: 350,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z"
        ],
        labels: {
            style: {
                colors: '#bcbcbc',
                fontSize: '12px'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: '#bcbcbc',
                fontSize: '12px'
            }
        }
    },
    legend: {
        labels: {
            colors: ['#bcbcbc']
        }
    },
    tooltip: {
        // theme: 'dark',
        x: {
            format: 'dd/MM/yy HH:mm'
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

const navLinks = document.querySelectorAll('#sidebar .side-menu a[data-target]');
const sections = document.querySelectorAll('main.main');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        // only preventDefault on the ones with data-target
        e.preventDefault();

        // toggle sidebar “active” class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // show/hide mains
        const targetId = link.dataset.target;
        sections.forEach(sec => {
            sec.id === targetId
                ? sec.classList.add('active')
                : sec.classList.remove('active');
        });
    });
});

// DASHBOARD DATA
