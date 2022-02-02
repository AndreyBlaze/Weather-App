'use strict';

function sendRequest(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f8a0e56c804a048953bd9bcab6ceca62`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            document.querySelector('.city').textContent = `${data.name}, ${data.sys.country}`;
            document.querySelector('.celcius').textContent = Math.round(data.main.temp - 273);
            document.querySelector('.weather__info').textContent = data.weather[0].main;
            document.querySelector('.wind__speed').textContent = `${data.wind.speed} m/s`;
            document.querySelector('.pressure__percent').textContent = `${Math.round(data.main.pressure / 1.333)} mmhg`
            
        })
}

let date = new Date(),
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
              'October', 'November', 'December'];
document.querySelector('.date').textContent = `${weekDays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;

ymaps.ready(function(){
    sendRequest(ymaps.geolocation.city);
});

const search = document.querySelector('.search-bar__input');
    
window.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' && search.value.length > 0) {
        let city = search.value;
        sendRequest(city);
    }
    
});