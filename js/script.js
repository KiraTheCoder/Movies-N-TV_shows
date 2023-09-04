const currentPath = window.location.pathname;

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function DateFormat(date) {
  const dateIN = new Date(date);
  return `${dateIN.getDate()}/${dateIN.getMonth() + 1}/${dateIN.getFullYear()}`;
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

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function displayBackgroundImage(type, backdrop_path) {
  const overlayDiv = document.createElement("div");
  const style = overlayDiv.style;
  style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  style.backgroundSize = "cover";
  style.backgroundPosition = "center";
  style.backgroundRepeat = "no-repeat";
  style.height = "100vh";
  style.width = "100vw";
  style.position = "absolute";
  style.top = "0";
  style.left = "0";
  style.zIndex = "-1";
  style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);

  }
}

// FUN for Fetch data from TMDB API

async function fetchData(endPoint) {
  const API_KEY = "d22d98fd43210ef8f253f6b8d4d44d03";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();
  const response = await fetch(
    `${API_URL}${endPoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();

  return data;
}

// Display movies
async function displayPopularMovies() {
  const { results } = await fetchData("movie/popular");

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
             src="../images/no-image.jpg"
               class="card-img-top"
               alt=${movie.title}
             />`
         }
          </a>
          <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
          <small class="text-muted">Release: ${DateFormat(
            movie.release_date
          )}</small>
          </p>
          </div>
          `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Display popular TV shows

async function displayPopularShows() {
  const { results } = await fetchData("tv/popular");
  console.log(results);

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="show-details.html?id=${show.id}">
    ${
      show.poster_path
        ? ` <img
               src=https://image.tmdb.org/t/p/w500/${show.poster_path}
               class="card-img-top"
               alt=${show.name}
             />`
        : `<img
               src="../images/no-image.jpg"
               class="card-img-top"
               alt=${show.name}
             />`
    }
          </a>
          <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
          <small class="text-muted">Release: ${DateFormat(
            show.first_air_date
          )}</small>
          </p>
          </div>
          `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function showMovieDetails() {
  const id = window.location.search.split("=")[1];
  const movie = await fetchData(`/movie/${id}`);

  displayBackgroundImage("movie", movie.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? ` <img
        src=https://image.tmdb.org/t/p/w500/${movie.poster_path}
        class="card-img-top"
        alt=${movie.title}
      />`
      : `<img
      src="../images/no-image.jpg"
        class="card-img-top"
        alt=${movie.title}
      />`
  }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${DateFormat(
              movie.release_date
            )}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join(" ")}
            </ul>
            <a href=${
              movie.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> ${addCommasToNumber(
              movie.runtime
            )}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => company.name)
            .join(", ")}</div>
`;

  document.querySelector("#show-details").appendChild(div);
}

async function showShowDetails() {
  const id = window.location.search.split("=")[1];
  const movie = await fetchData(`/movie/${id}`);

  displayBackgroundImage("movie", movie.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? ` <img
        src=https://image.tmdb.org/t/p/w500/${movie.poster_path}
        class="card-img-top"
        alt=${movie.title}
      />`
      : `<img
      src="../images/no-image.jpg"
        class="card-img-top"
        alt=${movie.title}
      />`
  }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${DateFormat(
              movie.release_date
            )}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join(" ")}
            </ul>
            <a href=${
              movie.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> ${addCommasToNumber(
              movie.runtime
            )}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => company.name)
            .join(", ")}</div>
`;

  document.querySelector("#show-details").appendChild(div);
}
function init() {
  switch (currentPath) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;

    case "/tv-details.html":
      showShowDetails;
      break;

    case "/shows.html":
      displayPopularShows();
      break;

    case "/search.html":
      break;

    case "/movie-details.html":
      showMovieDetails();
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
