import html from './index.html';
import style from './style.css';
import getWeatherDataFromLocation from './data';
import getGifSrcFromGify from '../getGifSrcFromGify';

let locationToSearch = document.querySelector('#location-collecter');
let locationName = 'Lomé';
let locationNameContainer = document.querySelector('.location-name');
const tempContainer = document.querySelector('.temp');
const searchIcon = document.querySelector('.search-icon');
const weatherContainer = document.querySelector('.weather');
const weatherInfoContainer = document.querySelector('.location-weather-info');
const cropRequestUrl = 'https://api.giphy.com/v1/gifs/translate?api_key=SsSqGDRjyoH2TXKUZJ98g5EeFuLZecnk&s=';

async function chargeLocationWeatherInfo(location) {
    const locationTemp = await getTemperatureOf(location);
    const locationWeather = await getWeatherOf(location);
    updateLocationNameVariable();
    displayLocationName();
    displayContentIn(`${locationTemp} ℃`, tempContainer);
    displayContentIn(`${locationWeather}`, weatherContainer);
    try {
        setGifAsBackGroundOf('sky' + locationWeather, weatherInfoContainer);
    } catch (err) {
        console.error('gif not found');
    }
}
async function getTemperatureOf(location) {
    const locationDataObject = await getWeatherDataFromLocation(location);
    const locationTemperature = await locationDataObject.main['temp'];
    return locationTemperature;
}

async function getWeatherOf(location) {
    const locationDataObject = await getWeatherDataFromLocation(location);
    const locationWeather = await locationDataObject.weather[0].description;
    return locationWeather;
}

function displayContentIn(content, target) {
    target.textContent = `${content}`;
}

async function setGifAsBackGroundOf(gifName, container) {
    const gifSrc = await getGifSrcFromGify(`${gifName}`, cropRequestUrl);
    setUrlAsBackgroudImgUrlOf(gifSrc, container)
}

function setUrlAsBackgroudImgUrlOf(urlToUse, target) {
    target.style.backgroundImage = `url(${urlToUse})`;
}

function updateLocationNameVariable() {
    if (!locationToSearch.value == '') {
        locationName = locationToSearch.value.toUpperCase();
    } else {
        locationName = 'lomé'.toLocaleUpperCase();
    }
}

function displayLocationName() {
    locationNameContainer.textContent = locationName;
}

function clearLocationName() {
    locationNameContainer.textContent = '';
}

function clearInput(inputToclear) {
    inputToclear.value = '';
}

searchIcon.addEventListener('click', () => {
    updateLocationNameVariable();
    clearLocationName();
    chargeLocationWeatherInfo(locationName);
    displayLocationName();
});
locationToSearch.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        updateLocationNameVariable();
        chargeLocationWeatherInfo(locationName);
    }
})

window.addEventListener('load', () => {
    updateLocationNameVariable();
    chargeLocationWeatherInfo(locationName);
})
