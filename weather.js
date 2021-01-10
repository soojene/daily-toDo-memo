const weatherContainer = document.querySelector(".js-weather");
const API_KEY = '0feb0c36f34bf10c945ce585d9cbe2b3'; //openweathermap API
//API는 다른 서버로부터 데이터를 손쉽게 가져오는 수단!
const coords = 'currentLocation';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
            return response.json();
        })
        .then (function(json){
            const place = json.name;
            const temp = json.main.temp;
            // const weatherDe= json.weather; 배열안에 있어서 어떻게 사용해야 하는지 잘 모르겠음
            weatherContainer.innerText = `${place}:  ${temp}℃`;
                // console.log(json); 가져온 날씨 데이터를 확인 할 수 있음.
        });
}

function saveCoords (coordsObj){
    localStorage.setItem(coords, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //객체에 변수 이름과 key의 이름을 같게 할때 이렇게 할 수 있음.
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cant access geo location");//엑세스를 허용하지 않으면 이 메세지 뜸.
}

function askForCoords(){
    navigator.geolocation
    .getCurrentPosition(handleGeoSuccess, handleGeoError);//인자 2개
}

function loadCoords (){
    const loadedCoords = localStorage.getItem(coords);
    if (loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init (){
    loadCoords();
}

init();