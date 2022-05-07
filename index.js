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
    });
}

const updateContent = (data) =>{
    console.log(data);
    const {temp, humidty} = data.main;
    const {description, icon} = data.weather[0];
    const {speed} = data.wind;
    document.querySelector(".city").textContent = `Weather in ${input.value}`;
    document.querySelector(".temp").textContent =  `${temp}°C`;
    document.querySelector("#icon").src = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector("#desc").textContent = description;
    document.querySelector("#speed").textContent =`${speed}km/h`;
    document.querySelector("#humidty").textContent = `${humidty}%`;
    document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + input.value + "')";
}

const searchBtn = document.querySelector("#searchBtn");
const input = document.querySelector("#searchBar")

searchBtn.addEventListener("click", () =>{
    getCoordinates(input.value);
})

input.addEventListener("keyup", (event) =>{
    if (event.key === "Enter"){
        getCoordinates(input.value);
    }
})


