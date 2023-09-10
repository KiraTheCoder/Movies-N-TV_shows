// Display movies
import { global } from "./GlobalData.js";
import { fetchData } from "./Fetch.js";
import { DateFormat,addCommasToNumber } from "./Method.js";
import { displayBackgroundImage } from "./DisplayBgImg.js";
// Display popular TV shows

async function displayPopularShows() {
  const { page, results, total_pages } = await fetchData("tv/popular");
  global.pages.current = page;
  global.pages.total = total_pages;
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="${global.rootPath}/tv-details.html?id=${show.id}">
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

export { displayPopularShows, showShowDetails };
