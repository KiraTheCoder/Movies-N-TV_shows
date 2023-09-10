import { global } from "./Componets/GlobalData.js";
import { highlightActiveLink } from "./Componets/Method.js";
import { displayPopularMovies, showMovieDetails } from "./Componets/Movies.js";
import { displayPopularShows, showShowDetails } from "./Componets/TvShows.js";
import { search } from "./Componets/Search.js";
import { displaySwiper } from "./Componets/HeaderSwiper.js";

//  pagination for Movies and TV Shows
let scrollCount = 0;
window.onwheel = (e) => {
  if (e.deltaY >= 0) {
    // scrolling
    scrollCount++;
    if (scrollCount >= 15) {
      scrollCount = 0;
      global.pages.current++;
      if (global.currentPath == `${global.rootPath}/shows.html`)
        displayPopularShows();

      if (
        global.currentPath == `${global.rootPath}/` ||
        `${global.rootPath}/index.html`
      )
        displayPopularMovies();
    }
  }
};

function init() {
  switch (global.currentPath) {
    case "/":
    case `${global.rootPath}/`:
    case `${global.rootPath}/index.html`:
      displayPopularMovies();
      displaySwiper();
      break;

    case `${global.rootPath}/tv-details.html`:
      showShowDetails();
      break;

    case `${global.rootPath}/shows.html`:
      displayPopularShows();
      break;

    case `${global.rootPath}/search.html`:
      search();
      break;

    case `${global.rootPath}/movie-details.html`:
      showMovieDetails();
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
