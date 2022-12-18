import html from './index.html';
import style from './style.css';
import getWeatherDataFromLocation from './data';

let locationToSearch = document.querySelector('#location-collecter');
let locationName = 'Lomé';
let locationNameContainer = document.querySelector('.location-name');
const tempContainer = document.querySelector('.temp');
const searchIcon = document.querySelector('.search-icon');
//const resquestedData = getWeatherDataFromLocation('Lomé').then(data => console.log(data.main['temp']));
async function getTemperatureOf(location) {
    const locationDataObject = await getWeatherDataFromLocation(location);
    if (!(locationToSearch.value === '')) {
        locationName = locationToSearch.value.toUpperCase();
        locationNameContainer.innerHTML = locationName;
    } else {
        locationNameContainer.innerHTML = locationName
    }
    const locationTemperature = await locationDataObject.main['temp'];
    tempContainer.innerHTML = `${locationTemperature} C`;
}


getTemperatureOf('lomé');
function updateLocationName() {
    locationNameContainer.innerHTML = locationToSearch.value.toUpperCase();
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