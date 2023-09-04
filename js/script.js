const currentPath = window.location.pathname;

// FUN for Fetch data from TMDB API

async function fetchData(endPoint = "movie/popular") {
  const API_KEY = "d22d98fd43210ef8f253f6b8d4d44d03";
  const API_URL = "https://api.themoviedb.org/3";

  const response = await fetch(
    `${API_URL}/${endPoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  console.log("🚀 ~ file: script.js:19 ~ fetchData ~ response:", response);
}
fetchData();

//  Highlight active link

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function init() {
  switch (currentPath) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;

    case "/tv-details.html":
      console.log("movie details");
      break;

    case "/shows.html":
      console.log("Shows");
      break;

    case "/search.html":
      console.log("Shows");
      break;

    case "/movie-details.html":
      console.log("movie details");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
