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

async function chargeLoactionWeatherInfo(location) {
    const locationTemp = await getTemperatureOf(location);
    const locationWeather = await getWeatherOf(location);
    updateLocationName();
    displayContentIn(`${locationTemp} ℃`, tempContainer);
    displayContentIn(`${locationWeather}`, weatherContainer)
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

function updateLocationName() {
    if (!locationToSearch.value === '') {
        locationNameContainer.textContent = locationToSearch.value.toUpperCase();
    } else {
        locationNameContainer.textContent = locationName;
    }
}

function clearInput(inputToclear) {
    inputToclear.value = '';
}

searchIcon.addEventListener('click', updateLocationName);
locationToSearch.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        updateLocationName();
        clearInput(locationToSearch);
    }
})

chargeLoactionWeatherInfo('lomé');