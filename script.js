function getWeather(){
    const apiKey = '6a87f6062f15aa8b18ca78a3bf4ba676';
    const city = document.getElementById('city').value;

    if (!city) {

        alert('Please Enter A City');
        return;
    }
    const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
   

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error =>{
        console.error('Error Finding Current Weather Info:', error);
        alert('Error Finding Weather Info, Please Try Again.');
    });


    
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error =>{
        console.error('Error Finding Hourly Forecast Info:', error);
        alert('Error Finding Hourly Forecast Info, Please Try Again.');
    });

}

function displayWeather(data){

    const tempDivInfo =document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const weatherIcon= document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

//clear records    
weatherInfoDiv.innerHTML='';
hourlyForecastDiv.innerHTML='';
tempDivInfo.innerHTML='';

if (data.cod==='404'){
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
}
else{

    const cityName=data.name;
    const temperature= Math.round(data.main.temp - 273.15);
    const description =data.weather[0].description;
    const iconCode =data.weather[0].icon;
    const iconUrl =`https://openweathermap.org/img/wn/${iconCode}@4x.png`;



    const temperatureHTML = `
    <p>${temperature}.C</p>
    `;

    const weatherHTML =`
    <p>${cityName}</p>
    <p>${description}</p>
    `;

    weatherInfoDiv.innerHTML= weatherHTML;
    tempDivInfo.innerHTML=temperatureHTML;
    weatherIcon.src =iconUrl;
    weatherIcon.alt =description;

    showImage();

}
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8); // Get the next 8 items (24 hours)

    hourlyForecastDiv.innerHTML = ''; // Clear previous data

    next24Hours.forEach(item => {
        const datetime = new Date(item.dt * 1000);
        const hour = datetime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Use `item` instead of `data`
        const iconCode = item.weather[0].icon; // Use `item` instead of `data`
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}


function showImage(){

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display='block';

}