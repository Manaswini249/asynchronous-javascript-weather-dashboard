const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const weatherResult =
document.getElementById("weatherResult");

const API_KEY = "YOUR_API_KEY";

async function fetchWeather(city){

try{

weatherResult.innerHTML =
"<p>Loading...</p>";

const response =
await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);

if(!response.ok){
throw new Error(
"City not found"
);
}

const data =
await response.json();

displayWeather(data);

}
catch(error){

weatherResult.innerHTML =
`
<p class="error">
${error.message}
</p>
`;

}
}

function displayWeather(data){

const cityName =
data.name;

const country =
data.sys.country;

const temperature =
data.main.temp;

const humidity =
data.main.humidity;

const windSpeed =
data.wind.speed;

const description =
data.weather[0].description;

weatherResult.innerHTML =
`
<div class="weather-card">

<h2>
${cityName},
${country}
</h2>

<p>
🌡 Temperature:
${temperature} °C
</p>

<p>
💧 Humidity:
${humidity}%
</p>

<p>
🌬 Wind Speed:
${windSpeed} m/s
</p>

<p>
☁ Condition:
${description}
</p>

</div>
`;
}

searchBtn.addEventListener(
"click",
() => {

const city =
cityInput.value.trim();

if(city){
fetchWeather(city);
}

}
);

cityInput.addEventListener(
"keypress",
(e)=>{

if(e.key==="Enter"){

const city =
cityInput.value.trim();

if(city){
fetchWeather(city);
}

}

}
);
