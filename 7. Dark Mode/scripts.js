document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const body = document.body;
    const mainHeading = document.getElementById('main-heading');
    const mainContent = document.getElementById('main-content');
    const activitiesContent = document.getElementById('activities-content');
    const weatherContent = document.getElementById('weather-content');
    const iconsContent = document.getElementById('icons-content');

    // Set initial mode based on local storage or default to light mode
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = 'brightness_7';
        updateContent('dark');
    } else {
        body.classList.add('light-mode');
        toggleButton.textContent = 'brightness_4';
        updateContent('light');
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = 'brightness_7';
            localStorage.setItem('theme', 'dark');
            updateContent('dark');
        } else {
            toggleButton.textContent = 'brightness_4';
            localStorage.setItem('theme', 'light');
            updateContent('light');
        }
    });

    function updateContent(mode) {
        if (mode === 'dark') {
            mainHeading.textContent = 'Night';
            mainContent.textContent = 'The moon is out, and it\'s a peaceful night!';
            activitiesContent.textContent = 'Relax and stargaze at night.';
            weatherContent.textContent = 'Nighttime weather can be cool and calm.';
            iconsContent.innerHTML = `
                <span class="material-icons">nights_stay</span>
                <span class="material-icons">star</span>
                <span class="material-icons">bedtime</span>
            `;
        } else {
            mainHeading.textContent = 'Day';
            mainContent.textContent = 'The sun is shining, and it\'s a beautiful day!';
            activitiesContent.textContent = 'Enjoy outdoor activities like hiking, biking, and picnics during the day.';
            weatherContent.textContent = 'Daytime weather is usually warm and sunny.';
            iconsContent.innerHTML = `
                <span class="material-icons">wb_sunny</span>
                <span class="material-icons">directions_bike</span>
                <span class="material-icons">local_florist</span>
            `;
        }
    }
});