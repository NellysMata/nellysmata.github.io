
const API_KEY = '25d156c2d1193c4dc854f431ec7bc5df';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorMsg = document.getElementById('errorMsg');
const rainContainer = document.getElementById('rainContainer');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) 
        getWeather(city);
});

cityInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
    }
});

async function getWeather(city) {
    errorMsg.textContent = '';
    weatherCard.style.display = 'none';
    rainContainer.innerHTML = '';

    try {
        const res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
        if (!res.ok) throw new Error('Ciudad no encontrada');
        const data = await res.json();
        showWeather(data);
    } catch (err) {
        errorMsg.textContent = 'No se pudo encontrar esa ciudad 😢';
    }
}

function showWeather(data) {
    const { name, sys, main, weather, wind } = data;
    const mainWeather = weather[0].main.toLowerCase();

    document.getElementById('cityName').textContent = `${name}, ${sys.country}`;
    document.getElementById('date').textContent = new Date().toLocaleDateString('es-ES');
    document.getElementById('temperature').textContent = `${Math.round(main.temp)}°`;
    document.getElementById('description').textContent = weather[0].description;
    document.getElementById('weatherIcon').textContent = getIcon(mainWeather);
    document.getElementById('wind').textContent = `${Math.round(wind.speed * 3.6)} km/h`;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}°`;
    document.getElementById('haiku').innerHTML = getHaiku(mainWeather);

    weatherCard.style.display = 'block';

    if (mainWeather === 'rain') createRain();
}

function getIcon(weather) {
    const icons = {
        clear: '☀️', clouds: '☁️', rain: '🌧️', drizzle: '🌦️',
        thunderstorm: '⛈️', snow: '❄️', mist: '🌫️'
    };
    return icons[weather] || '🌤️';
}

function getHaiku(weather) {
    const haikus = {
        clear: 'El sol resplandece,<br>pájaros cantan alegres,<br>la brisa susurra.',
        clouds: 'Nubes van pasando,<br>el cielo gris y sereno,<br>la calma perdura.',
        rain: 'Gotas de lluvia,<br>danzan sobre el tejado,<br>la tierra suspira.',
        snow: 'Nieve cae lenta,<br>cubre el mundo en silencio,<br>paz invernal reina.',
        mist: 'Niebla envuelve todo,<br>el mundo se difumina,<br>misterio en el aire.'
    };
    return haikus[weather] || 'El día transcurre,<br>la naturaleza fluye,<br>en armonía.';
}

function createRain() {
    rainContainer.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        rainContainer.appendChild(drop);
    }
}

// Al cargar, muestra una ciudad por defecto
window.addEventListener('load', () => getWeather('Madrid'));
