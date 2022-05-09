const apiKey = `a52e040256e3ac2c1ccd162104229cf4`;

const fetchWeather = (lat, lon) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => updateContent(data));
}

const getCoordinates = (city) =>{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}
    &limit=${1}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        const {lat, lon} = data[0];
        fetchWeather(lat, lon);
    })
}

const updateContent = (data) =>{
    document.querySelector(".weather").classList.remove("loading");
    const {name} = data;
    const {temp, pressure} = data.main;
    const {description, icon} = data.weather[0];
    const {speed} = data.wind;
    document.querySelector(".city").textContent = `Weather in ${name}`;
    document.querySelector(".temp").textContent =  `${temp}°C`;
    document.querySelector("#icon").src = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector("#desc").textContent = description;
    document.querySelector("#speed").textContent =`Wind speed: ${speed}km/h`;
    document.querySelector("#humidty").textContent = `Pressure: ${pressure}mmHg`;
    document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + input.value + "')";
}

const getdefaultCity = () => {
    const apikey = 'at_6LDGx376YFUU95TGL54y3ftV7SRae';

    fetch('https://geo.ipify.org/api/v2/country,city?apiKey='
    +apikey
    +'&ipAddress='
    )
    .then(response => response.json())
    .then(data => {
        const {lat, lng} = data.location;
        fetchWeather(lat, lng);
    })
};


getdefaultCity();

const searchBtn = document.querySelector("#searchBtn");
const input = document.querySelector("#searchBar")

searchBtn.addEventListener("click", () =>{
    document.querySelector(".weather").classList.add("loading");
    getCoordinates(input.value);
})

input.addEventListener("keyup", (event) =>{
    if (event.key === "Enter"){
        document.querySelector(".weather").classList.add("loading");
        getCoordinates(input.value);
    }
})


