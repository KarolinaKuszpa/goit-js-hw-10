import Notiflix from 'notiflix';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

console.log(Notiflix);

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
// przechowuje wartość wpisaną przez użytkownika w polu wyszukiwania
let findCountryName = '';

//Utwórz funkcję, która będzie wywoływać funkcję searchCountries po opóźnieniu o 500 ms:
const delayedSearch = debounce(() => {
  const searchQuery = searchInput.value.trim();
  searchCountries(searchQuery); // pass searchQuery to searchCountries
}, 500);
//Dodaj nasłuchiwanie zdarzenia input na elemencie searchInput i wywołaj funkcję delayedSearch:
searchInput.addEventListener('input', delayedSearch);
//przypisywanie zmiennych do el.html
// Przechowywane są odwołania do elementów HTML
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
//Funkcja searchCountries pobiera wartość pola wyszukiwania, a następnie wywołuje funkcję fetchCountries z argumentem searchQuery. W funkcji then obsługujemy odpowiedź z funkcji fetchCountries. Jeśli zwrócona tablica zawiera więcej niż 10 krajów, wyświetlimy komunikat, że znaleziono zbyt wiele krajów. Jeśli znajdziemy dokładnie jeden kraj, wywołamy funkcję renderCountryInfo i wyświetlimy szczegóły tego kraju. W przeciwnym razie wywołamy funkcję renderCountryList i wyświetlimy listę krajów.
function searchCountries(searchQuery) {
  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length === 1) {
        renderCountryInfo(countries[0]);
        return;
      }

      renderCountryList(countries);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Something went wrong. Please try again.');
    });
}

//Funkcja renderCountryList wyświetla listę krajów

function renderCountryList(countries) {
  const html = countries
    .map(
      country => `
      <li class="country-list">
        <img class="country-serach"  src="${country.flags.svg}" alt="${country.name.official} flag" width="75", height="55">
        <span>${country.name.official}</span>
      </li>
    `
    )
    .join('');
  countryList.innerHTML = `${html}`;
}
// funkcja renderCountryInfo wyświetla szczegóły jednego kraju.
function renderCountryInfo(country) {
  // Wypełnienie pola z nazwą kraju
  const countryName = document.createElement('h3');
  countryName.textContent = country.name.official;
  countryInfo.appendChild(countryName);

  // Wypełnienie pola z flagą kraju
  const countryFlag = document.createElement('img');
  countryFlag.src = country.flags.svg;

  countryFlag.alt = `${country.name.official} flag`;
  countryInfo.appendChild(countryFlag);

  // Wypełnienie pola z informacją o stolicy kraju
  const capitalLabel = document.createElement('strong');
  capitalLabel.textContent = 'Capital: ';
  const capital = document.createElement('span');
  capital.textContent = country.capital;
  countryInfo.appendChild(capitalLabel);
  countryInfo.appendChild(capital);

  // Wypełnienie pola z informacją o populacji kraju
  const populationLabel = document.createElement('strong');
  populationLabel.textContent = 'Population: ';
  const population = document.createElement('span');
  population.textContent = country.population.toLocaleString();
  countryInfo.appendChild(populationLabel);
  countryInfo.appendChild(population);

  // Wypełnienie pola z informacją o językach kraju
  const languagesLabel = document.createElement('strong');
  languagesLabel.textContent = 'Languages: ';
  const languages = document.createElement('span');
  languages.textContent = Object.values(country.languages).join(', ');
  countryInfo.appendChild(languagesLabel);
  countryInfo.appendChild(languages);
}
