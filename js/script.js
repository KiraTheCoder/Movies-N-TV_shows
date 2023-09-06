const global = {
  currentPath: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: "",
  },
  api: {
    apiKey: "d22d98fd43210ef8f253f6b8d4d44d03",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

// show alert

function showAlert(message, className = "alert-error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  const alert = document.querySelector("#alert");
  alert.appendChild(alertEl);

  setTimeout(() => {
    alert.remove();
  }, 4000);
}
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
    if (link.getAttribute("href") === global.currentPath) {
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
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}${endPoint}?api_key=${API_KEY}&language=en-US`
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
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&include_adult=false`
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
    initSlider();
  });
}
function initSlider() {
  const swiper = new Swiper(".swiper", {
    spaceBetween: 30,
    slidesPerView: 1,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1500: {
        slidesPerView: 6,
      },
    },
  });
}
async function displaySwiper() {
  const { results } = await fetchData("movie/now_playing");
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = ` 
    <a href="movie-details.html?id=${movie.id}">
    <img  src=https://image.tmdb.org/t/p/w500/${movie.poster_path} 
    alt=${movie.title} />
    </a>
    <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
    `;
    swiperWrapper.appendChild(div);
  });
}
displaySwiper();

// Searched Movies and Tv Shows add to DOM

function displaySearchResults(results) {
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href=${global.search.type}-details.html?id=${result.id}>
    ${
      result.poster_path
        ? ` <img
               src=https://image.tmdb.org/t/p/w500/${result.poster_path}
               class="card-img-top"
               alt=${
                 global.search.type === "movie" ? result.title : result.name
               }
             />`
        : `<img
               src="../images/no-image.jpg"
               class="card-img-top"
               alt=${global.search.type == "movie" ? result.title : result.name}
             />`
    }
          </a>
          <div class="card-body">
          <h5 class="card-title">${
            global.search.type == "movie" ? result.title : result.name
          }</h5>
          <p class="card-text">
          <small class="text-muted">Release: ${DateFormat(
            global.search.type == "movie"
              ? result.release_date
              : result.first_air_date
          )}</small>
          </p>
          </div>
          `;

    document.querySelector("#search-results").appendChild(div);
  });
}

// Search Movies and Tv Shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  if (global.search.term !== "" && global.search.term !== null) {
    // make request and display results
    const { page, results, total_pages } = await searchAPIData();

    if (results.length === 0) {
      showAlert("No result found");
      return;
    }

    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter input in search box");
  }
}

// Display popular TV shows

async function displayPopularShows() {
  const { results } = await fetchData("tv/popular");
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

  document.querySelector("#movie-details").appendChild(div);
}

async function showShowDetails() {
  const id = window.location.search.split("=")[1];
  const show = await fetchData(`/tv/${id}`);

  displayBackgroundImage("show", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
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
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${DateFormat(
              show.last_air_date
            )}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${show.genres.map((genre) => `<li>${genre.name}</li>`).join(" ")}
            </ul>
            <a href=${
              show.homepage
            } target="_blank" class="btn">Visit show Homepage</a>
          </div>
        </div>
        </div>


        <div class="details-bottom">
          <h2>show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episode:</span> 
            ${show.number_of_episodes}
            </li>
            <li><span class="text-secondary">Last Episode To Air:</span> 
            ${show.last_episode_to_air.name}
            </li>

            <li><span class="text-secondary">Status:</span> ${addCommasToNumber(
              show.status
            )}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => company.name)
            .join(", ")}</div>
`;

  document.querySelector("#show-details").appendChild(div);
}

function init() {
  switch (global.currentPath) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;

    case "/show-details.html":
      showShowDetails();
      break;

    case "/shows.html":
      displayPopularShows();
      break;

    case "/search.html":
      search();
      break;

    case "/movie-details.html":
      showMovieDetails();
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
