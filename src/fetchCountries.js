import Notiflix from 'notiflix';
const API_ENDPOINT_NAME_COUNTRIES = 'https://restcountries.com/v3.1/all';

function fetchCountries = name=> {
  return fetch(API_ENDPOINT_NAME_COUNTRIES)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //zwracamy dane w formacie json
      return response.json();
    })
    .then(data => {
      // Data handling
      return data;
    })
    .catch(error => {
      // Error handling
      console.log(error);
    });
}
fetchCountries()
  .then(data => console.log(data))
  .catch(error => console.log(error));

//Napisz funkcję fetchCountries(name) która tworzy żądanie HTTP do endpointa
//name i przekazuje obietnicę której wynikiem będzie tablica
//krajów będącą wynikiem żądania.
//Przenieś ją do oddzielnego pliku fetchCountries.js
// i eksportuj ją przy pomocy jej nazwy (named export).

//pobieramy dane z API i analizujemy odpowiedź z serwera. Jeśli występuje błąd przy pobieraniu
