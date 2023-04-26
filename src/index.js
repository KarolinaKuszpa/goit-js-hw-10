import './css/styles.css';
import debounce from 'lodash.debounce';
export { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

//przypisywanie zmiennych do el.html
// Przechowywane są odwołania do elementów HTML
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
