
const widget = document.querySelector('#widget'),

      current = widget.querySelector('#current'),
      forecasc = widget.querySelector('#forecasc');


//   current.insertAdjacentHTML('beforeend', '<p id="time"></p>');
const getNowTime = () =>{
    let now = new Date();
    let nowTime = now.toLocaleTimeString();
  
    current.querySelector('#time').textContent = `${nowTime}`;
    setTimeout (getNowTime, 1000);
};

getNowTime();

const renderMain = (weatherKobrin) =>{
 
    current.insertAdjacentHTML('afterbegin', `<p id="city">${weatherKobrin.city.name}</p>` );
    current.insertAdjacentHTML('beforeend', `<div class="img-event-tem">
    <img src="https://openweathermap.org/img/wn/${weatherKobrin.list[0].weather[0].icon}@2x.png" alt="icon">
    <p>${weatherKobrin.list[0].weather[0].main}</p>
    <p>${Math.round(weatherKobrin.list[0].main.temp)} ℃</p>
    </div>
    <div class="speed"> 
    <p>Speed </p> <p>${weatherKobrin.list[0].wind.speed.toFixed(1)} m/s</p>
    </div>`)
}


const renderRow = (weatherKobrin, i) => {
    
forecasc.insertAdjacentHTML('afterbegin', `<div class="row">
<div class="date-time">
<p>${weatherKobrin.list[i].dt_txt}</p>
</div>
<img src="https://openweathermap.org/img/wn/${weatherKobrin.list[i].weather[0].icon}@2x.png" alt="icon">
<p>${Math.round(weatherKobrin.list[i].main.temp)} ℃</p>
</div>
`)
}


let requestWeather = new XMLHttpRequest();
 
// requestWeather.open('Get', 'https://api.openweathermap.org/data/2.5/forecast?q=Kobrin&appid=bb05314415f48ba6bb5c9002c2029146&units=metric');
 
// requestWeather.send();

requestWeather.onload = function () {
const weatherKobrin = JSON.parse(requestWeather.response);
console.log(weatherKobrin);
renderMain(weatherKobrin);

for (let i = 0; i <40; i+=8){
    renderRow(weatherKobrin, i);
}

};





navigator.geolocation.getCurrentPosition(
    function(position) {
	    
     let latitude  = position.coords.latitude; 
     let longitude = position.coords.longitude;    
    //  console.log(latitude, longitude);    
      requestWeather.open('Get', `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=bb05314415f48ba6bb5c9002c2029146&units=metric`);
 
     requestWeather.send();
    
	}
);

