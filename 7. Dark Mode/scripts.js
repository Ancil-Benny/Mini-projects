document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const body = document.body;
    const mainHeading = document.getElementById('main-heading');
    const mainContent = document.getElementById('main-content');
    const activitiesContent = document.getElementById('activities-content');
    const weatherContent = document.getElementById('weather-content');
    const iconsContent = document.getElementById('icons-content');

    try {
        if (localStorage.getItem('theme') === 'dark') {
            setDarkMode();
        } else {
            setLightMode();
        }
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        setLightMode(); 
    }

    toggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            setLightMode();
            try {
                localStorage.setItem('theme', 'light');
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        } else {
            setDarkMode();
            try {
                localStorage.setItem('theme', 'dark');
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        }
    });

    function setDarkMode() {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        toggleButton.textContent = 'brightness_7';
        toggleButton.setAttribute('aria-label', 'Switch to light mode');
        updateContent('dark');
    }

    function setLightMode() {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggleButton.textContent = 'brightness_4';
        toggleButton.setAttribute('aria-label', 'Switch to dark mode');
        updateContent('light');
    }

    function updateContent(mode) {
        if (mode === 'dark') {
            mainHeading.textContent = 'Night';
            mainContent.textContent = 'The moon is out, and it\'s a peaceful night!';
            activitiesContent.textContent = 'Relax and stargaze at night.';
            weatherContent.textContent = 'Nighttime weather can be cool and calm.';
            iconsContent.innerHTML = `
                <span class="material-icons" aria-hidden="true">nights_stay</span>
                <span class="material-icons" aria-hidden="true">star</span>
                <span class="material-icons" aria-hidden="true">bedtime</span>
            `;
        } else {
            mainHeading.textContent = 'Day';
            mainContent.textContent = 'The sun is shining, and it\'s a beautiful day!';
            activitiesContent.textContent = 'Enjoy outdoor activities like hiking, biking, and picnics during the day.';
            weatherContent.textContent = 'Daytime weather is usually warm and sunny.';
            iconsContent.innerHTML = `
                <span class="material-icons" aria-hidden="true">wb_sunny</span>
                <span class="material-icons" aria-hidden="true">directions_bike</span>
                <span class="material-icons" aria-hidden="true">local_florist</span>
            `;
        }
    }
});
