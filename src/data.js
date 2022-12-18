
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const appId = '&APPID=f9a888b731855bb8fb61a39b61e95564';
const dataUnits = '&units=metric';
async function getWeatherDataFromLocation(locationName) {
    locationName = `${locationName}`;
    const locationDataUrl = openWeatherUrl + locationName + appId + dataUnits;
    const weatherPromise = await (fetch(locationDataUrl));
    const weatherData = await weatherPromise.json();
    return weatherData;
}

async function getTemperatureOf(location) {
    const locationDataObject = await getWeatherDataFromLocation(location);
    console.log(locationDataObject);
}

export default getWeatherDataFromLocation;