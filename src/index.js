import html from './index.html';
import style from './style.css';
import getWetherDataFromLocation from './data';

const resquestedData = getWetherDataFromLocation('kara').then(data => console.log(data));