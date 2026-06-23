let btn = document.querySelector(".search-btn");

let input = document.querySelector("input");

let themeBtn = document.querySelector(".theme-toggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


btn.addEventListener("click", () => {
    let city = input.value;

    if (city === "") {
        alert("please Enter the City Name");
        return;
    }
    getweatherdata(city);
})

const API_Key = "83c4eaa3805bb67e0280ff68727abf26";

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

async function getweatherdata(city) {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;

    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}&units=metric`;

    let responseF = await fetch(forecastURL);

    let dataF = await responseF.json();

    console.log(dataF.list[0]);
    for(let i = 0; i < 5; i++){
        console.log(dataF.list[i*8].main.temp);
        console.log(dataF.list[i*8].weather[0].icon);
    }

    const days = document.querySelectorAll(".days");
    const forecastDays = document.querySelectorAll(".forecast-day");
    const forecastTemps = document.querySelectorAll(".forecast-temp");
    const forecastIcons = document.querySelectorAll(".forecast-icon");

    for(let i = 0; i < 5; i++){

        let dayName = new Date(dataF.list[i*8].dt_txt)
            .toLocaleDateString("en-US",{weekday:"short"});

        let temp = Math.round(dataF.list[i*8].main.temp);

        forecastDays[i].textContent = dayName;
        forecastTemps[i].textContent = temp + "°C";

        let iconCode = dataF.list[i*8].weather[0].icon;

        forecastIcons[i].src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    let name = document.querySelector(".cityname");

    name.textContent = "Loading...";

    let response = await fetch(URL);

    let data = await response.json();

    if (data.cod == "404") {
        alert("City not found");
        return;
    }


    let dateElement = document.querySelector(".date");

    let temperature = document.querySelector(".temperature");

    let description = document.querySelector(".description");

    let rain = document.querySelector(".rain-value");

    let wind = document.querySelector(".wind-value");

    let humidity = document.querySelector(".humidity-value");

    let pressure = document.querySelector(".pressure-value");

    let sunrise = document.querySelector(".sunrise");

    let sunset = document.querySelector(".sunset");

    let iconElement = document.querySelector(".weather-icon");

    const iconCode = data.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    iconElement.src = iconUrl;

    console.log(data);
    name.textContent = data.name;

    document.title = `${data.name} Weather`;

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    dateElement.textContent = formattedDate;


    temperature.textContent = data.main.temp + "°C";

    description.textContent = data.weather[0].description;

    rain.textContent = data.clouds.all + "%";

    humidity.textContent = data.main.humidity + "%";

    wind.textContent = data.wind.speed;

    pressure.textContent = data.main.pressure + "hPa";

    const sunriseTime = new Date(data.sys.sunrise * 1000)
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    const sunsetTime = new Date(data.sys.sunset * 1000)
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    sunrise.textContent = sunriseTime;
    sunset.textContent = sunsetTime;

    input.value = "";
}

getweatherdata("Ahmedabad");