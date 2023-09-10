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

export { displayBackgroundImage };
