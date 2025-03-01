
// Função para obter a localização do usuário
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocalização não suportada.";
    }
}

// Função para obter dados climáticos
function getWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = 'SUA_CHAVE_API_OPENWEATHERMAP'; // Substitua pela sua chave API

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const location = `${data.name}, ${data.sys.country}`;

            document.getElementById("location").innerHTML = `Localização: ${location}`;
            document.getElementById("weather").innerHTML = `Temperatura: ${temperature}°C, Umidade: ${humidity}%, ${description}`;
        })
        .catch(error => {
            console.error("Erro ao obter dados climáticos:", error);
            document.getElementById("weather").innerHTML = "Erro ao obter dados climáticos.";
        });
}

// Função para lidar com erros de geolocalização
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "Usuário negou a solicitação de geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Informação de localização indisponível.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "A solicitação de geolocalização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "Um erro desconhecido ocorreu.";
            break;
    }
}

// Chamar a função para obter a localização ao carregar a página
getLocation();

// Funções para obter dados astronômicos (lua, estações, sabbats)
// ... (Implemente aqui usando APIs de astronomia ou cálculos)

