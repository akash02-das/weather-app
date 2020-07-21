window.addEventListener('load', () => {

    let long;
    let lat;

    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span sup');
    let weatherHumidity = document.querySelector('.humidity');
    let weatherWind = document.querySelector('.wind');
    let currentTime = document.querySelector('.current-time');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    //console.log(data);

                    getDataFromApi(data);
                });
        });
    }

    function getDataFromApi(data) {

        const {
            temperature,
            summary,
            icon,
            humidity,
            windSpeed
        } = data.currently;

        // Set DOM elements from the API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        currentTime.innerHTML = Date();
        weatherHumidity.textContent = (humidity * 100) + "%";
        weatherWind.textContent = Math.floor(windSpeed * 1.6) + " km/h";

        // Formula for Celsius
        let celsius = (temperature - 32) * (5 / 9);

        // Set Icon
        setIcons(icon, document.querySelector('.icon'));

        // Convert Temperature to Celsius/Fahrenheit
        degreeSection.addEventListener('click', () => {
            if (degreeSpan.textContent === "F") {
                degreeSpan.textContent = "C";
                temperatureDegree.textContent = celsius.toFixed(2);
            } else {
                degreeSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
            }
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});