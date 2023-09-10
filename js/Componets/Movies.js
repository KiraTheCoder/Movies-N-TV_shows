// Display movies
import { global } from "./GlobalData.js";
import { fetchData } from "./Fetch.js";
import { DateFormat,addCommasToNumber } from "./Method.js";
import { displayBackgroundImage } from "./DisplayBgImg.js";
async function displayPopularMovies() {
  const { page, results, total_pages } = await fetchData("movie/popular");
  global.pages.current = page;
  global.pages.total = total_pages;

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <a href="${global.rootPath}/movie-details.html?id=${movie.id}">
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
               ${movie.genres
                 .map((genre) => `<li>${genre.name}</li>`)
                 .join(" ")}
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

export { displayPopularMovies, showMovieDetails };
