import { global } from "./GlobalData.js";
import { showAlert } from "./Method.js";
import { searchAPIData } from "./Fetch.js";
import { DateFormat, displayPagination } from "./Method.js";

// Searched Movies and Tv Shows add to DOM

function displaySearchResults(results) {
  // clear previous results
  document.querySelector("#search-results").innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href=${global.rootPath}/${global.search.type}-details.html?id=${
      result.id
    }>
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
                 alt=${
                   global.search.type == "movie" ? result.title : result.name
                 }
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
    displayPagination();
    document.querySelector("#search-results-heading").innerHTML = `
            <h2>${results.length} of ${global.search.totalResults} for ${global.search.term}`;
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
    const { page, results, total_pages, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

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

export { search, displaySearchResults };
