const currentPath = window.location.pathname;

async function displayPopularMovies() {
  const { results } = await fetchData("movie/popular");
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
         ${
           movie.poster_path
             ? ` <img
               src=https://image.tmdb.org/t/p/w500/${movie.poster_path}
               class="card-img-top"
               alt=${movie.title}
             />`
             : `<img
               src="https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
               class="card-img-top"
               alt=${movie.title}
             />`
         }
          </a>
          <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
          </div>
          `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

// FUN for Fetch data from TMDB API

async function fetchData(endPoint) {
  const API_KEY = "d22d98fd43210ef8f253f6b8d4d44d03";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endPoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  return data;
}

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
      displayPopularMovies();
      break;

    case "/tv-details.html":
      console.log("movie details");
      break;

    case "/shows.html":
      console.log("Shows");
      break;

    case "/search.html":
      console.log("search");
      break;

    case "/movie-details.html":
      console.log("movie details");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
