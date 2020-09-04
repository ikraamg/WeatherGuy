import 'bootstrap';
import './style.scss';

const API_KEY = process.env.API;
const inputLocation = document.querySelector('#locationInput');
const searchBut = document.querySelector('#search');
const getLocation = async (location) => {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
  const data = await response.json();
  return data;
};

const searchLocation = async () => {
  const location = inputLocation.value;
  getLocation(location).then(data => console.log(data));
};

searchBut.addEventListener('click', searchLocation);