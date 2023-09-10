import { fetchData } from "./Fetch.js";
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
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.style.boxShadow =
      "0 19px 38px rgba(0,0,0,0.35), 0 15px 12px rgba(0,0,0,0.28)";
    div.innerHTML = ` 
      <a href="movie-details.html?id=${movie.id}">
      <img  src=https://image.tmdb.org/t/p/w500/${movie.poster_path} 
      alt=${movie.title} />
      </a>
      <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
      `;
    document.querySelector(".swiper-wrapper").appendChild(div);
  });
  initSlider();
}

export { displaySwiper };
