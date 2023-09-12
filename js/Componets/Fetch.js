import { global } from "./GlobalData.js";

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// FUN for Fetch data from TMDB API

async function fetchData(endPoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}${endPoint}?api_key=${API_KEY}&language=en-US&page=${global.pages.current}`
  );

  const data = await response.json();
  hideSpinner();

  return data;
}

//  Make request to Search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();
  hideSpinner();

  return data;
}

export { fetchData, searchAPIData };
