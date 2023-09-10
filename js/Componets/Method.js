import { global } from "./GlobalData.js";
import { searchAPIData } from "./Fetch.js";
import { displaySearchResults } from "./Search.js";
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
//
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//
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

// pagination for Search

function displayPagination() {
  // clear previous results
  document.querySelector("#pagination").innerHTML = "";
  const div = document.createElement("div");
  div.style.display = "pagination";
  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">${global.search.page}  of ${global.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  const prevBtn = document.querySelector("#prev");
  if (global.search.page < 2) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inner-block";
  }
  prevBtn.addEventListener("click", async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });

  const nextBtn = document.querySelector("#next");
  if (global.search.page >= global.search.totalPages) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inner-block";
  }
  nextBtn.addEventListener("click", async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
}

export {
  showAlert,
  addCommasToNumber,
  DateFormat,
  highlightActiveLink,
  displayPagination,
};
