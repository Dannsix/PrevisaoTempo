document.addEventListener('DOMContentLoaded', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Busca dados do clima
            await fetchWeatherData(lat, lon);

            // Busca fase da lua
            fetchMoonPhase();

            // Busca estação e sabá
            fetchSeasonAndSabbat(lat, lon);
        });
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
});

async function fetchWeatherData(lat, lon) {
    const apiKey = 'SUA_CHAVE_DE_API';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('location').textContent = data.name;
        document.getElementById('temperature').textContent = `${data.main.temp} °C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('rainProbability').textContent = `${data.rain ? data.rain['1h'] : 0}%`;
    } catch (error) {
        console.error('Erro ao buscar dados do tempo:', error);
    }
}

async function fetchMoonPhase() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'SUA_CHAVE_DE_API',
            'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch('https://moon-phase.p.rapidapi.com/phase', options);
        const data = await response.json();
        document.getElementById('moonPhase').textContent = data.phase;
        document.getElementById('daysToFullMoon').textContent = data.days_to_full_moon;
    } catch (error) {
        console.error('Erro ao buscar fase da lua:', error);
    }
}

function fetchSeasonAndSabbat(lat, lon) {
    const today = new Date();
    const seasons = [
        { name: 'Primavera', start: '2025-09-22' },
        { name: 'Verão', start: '2025-12-21' },
        { name: 'Outono', start: '2026-03-20' },
        { name: 'Inverno', start: '2026-06-21' }
    ];
    const nextSeason = seasons.find(season => new Date(season.start) > today);
    document.getElementById('currentSeason').textContent = nextSeason.name;
    document.getElementById('daysToNextSeason').textContent = Math.floor((new Date(nextSeason.start) - today) / (1000 * 60 * 60 * 24));

    const sabbats = [
        { name: 'Samhain', date: '2025-10-31' },
        { name: 'Yule', date: '2025-12-21' },
        { name: 'Imbolc', date: '2026-02-01' },
        { name: 'Ostara', date: '2026-03-20' },
        { name: 'Beltane', date: '2026-05-01' },
        { name: 'Litha', date: '2026-06-21' },
        { name: 'Lughnasadh', date: '2026-08-01' },
        { name: 'Mabon', date: '2026-09-22' }
    ];
    const nextSabbat = sabbats.find(sabbat => new Date(sabbat.date) > today);
    document.getElementById('currentSabbat').textContent = nextSabbat.name;
    document.getElementById('daysToNextSabbat').textContent = Math.floor((new Date(nextSabbat.date) - today) / (1000 * 60 * 60 * 24));
        }
