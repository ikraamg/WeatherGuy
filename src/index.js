import 'bootstrap';
import './style.scss';
import AutoComplete from '@tarekraafat/autocomplete.js';
import displayController from './dom';

const API_KEY = '5ce7101c4fb54407a4b150637200309';

const getWeather = async (location) => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`);
  const data = await response.json();
  return data;
};

const searchLocations = async () => {
  const query = document.querySelector('#autoComplete').value;
  const source = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`);
  const data = await source.json();
  return data;
};

// eslint-disable-next-line no-unused-vars
const autoSearch = new AutoComplete({
  data: {
    src: searchLocations,
    key: ['name'],
    cache: false,
  },
  resultsList: {
    render: true,
    container: source => {
      source.setAttribute('id', 'location_list');
    },
    destination: document.querySelector('#autoComplete'),
    position: 'afterend',
    element: 'ul',
  },
  maxResults: 5,
  threshold: 0,
  debounce: 0,
  searchEngine: 'strict',
  highlight: true,
  resultItem: {
    content: (data, source) => {
      source.textContent = data.value.name;
    },
    element: 'li',
  },
  noResults: () => {
    const result = document.createElement('li');
    result.setAttribute('class', 'no_result');
    result.setAttribute('tabindex', '1');
    result.innerHTML = 'No results found, please type at least 4 characters or the full name of the city.abs';
    document.querySelector('#location_list').appendChild(result);
  },
  onSelection: feedback => {
    displayController.clearWeather();
    getWeather(feedback.selection.value.name).then((data) => {
      displayController.displayWeather(data);
    });
  },
});