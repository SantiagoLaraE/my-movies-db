const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
const hola = new Promise((resolve, reject) => {});
/* API functions*/

async function getMoviesBySearch(query) {
  const encoded = encodeURI(query);
  const { data } = await api("/search/movie", {
    params: {
      query: encoded,
    },
  });

  createMovies(data.results, genericListMoviesPreview);
}

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const [topMovie, ...movies] = data.results;

  createTopMoviePreview(topMovie);
  createMovies(movies, trendingMoviesPreviewList);
}

async function getTrendingMoviesList() {
  const { data } = await api("/trending/movie/week");

  createMovies(data.results, genericListMoviesPreview);
}
async function getPopularMoviesList() {
  const { data } = await api("/movie/popular");

  createMovies(data.results, genericListMoviesPreview);
}
async function getUpcomingMoviesList() {
  const { data } = await api("/movie/upcoming");

  createMovies(data.results, genericListMoviesPreview);
}

async function getMovieCategoriesPreview() {
  const { data } = await api("/genre/movie/list");

  createCategories(data.genres, categoriesPreviewList);
  createCategories(data.genres, genericListCategories);
}

async function getMoviesByCategory(id) {
  const { data } = await api("/discover/movie?with-genres=", {
    params: {
      with_genres: id,
    },
  });

  createMovies(data.results, genericListMoviesPreview);
}

async function getPopularMovies() {
  const { data } = await api("/movie/popular");

  createMovies(data.results, popularMoviesPreviewList);
}
async function getUpcomingMovies() {
  const { data } = await api("/movie/upcoming");

  createMovies(data.results, upcomingMoviesPreviewList);
}

async function getMovieDetailsById(id) {
  const { data: movie } = await api("/movie/" + id);

  createMovieDetails(movie);
  createCategories(movie.genres, movieDetailCategoriesList);
  getSimilarMovierById(id);
}

async function getSimilarMovierById(id) {
  const { data } = await api(`/movie/${id}/similar`);

  const similarMovies = data.results;

  createMovies(similarMovies, relatedMoviesContainer);
}

async function getVideoByMovie(id) {
  const { data } = await api(`/movie/${id}/videos`);

  const videos = data.results;
  const [{ key: keyVideo }] = videos.filter(
    ({ type, site }) => type == "Trailer" && site == "YouTube"
  );

  createVideoPopup(keyVideo);
}

/* Navbar function*/
function toggleMenuNav() {
  if (headerNav.classList.contains("open")) {
    headerNav.classList.remove("open");
    navToggleBtn.classList.remove("open");
  } else {
    navToggleBtn.classList.add("open");
    headerNav.classList.add("open");
  }
}
navToggleBtn.addEventListener("click", toggleMenuNav);

function toggleSearchSection() {
  if (headerSearch.classList.contains("open")) {
    headerSearch.classList.remove("open");
    navSearchToggleBtn.classList.remove("open");
  } else {
    navSearchToggleBtn.classList.add("open");
    headerSearch.classList.add("open");
  }
}

navSearchToggleBtn.addEventListener("click", toggleSearchSection);

navLinkbtns.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenuNav();
  });
});

/* Create functions*/

function createMovies(moviesData, renderSection) {
  const fragment = new DocumentFragment();
  moviesData.forEach((movie) => {
    const figure = document.createElement("figure");
    figure.classList.add("movie-container");
    figure.addEventListener("click", () => {
      location.hash = `movie=${movie.id}&${movie.title}`;
    });

    const img = document.createElement("img");
    img.classList.add("movie-container__img");
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w154${movie.poster_path}`
    );
    img.setAttribute("alt", `${movie.title}`);

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("movie-container__title");
    const figcaptionText = document.createTextNode(movie.title);
    figcaption.appendChild(figcaptionText);

    figure.appendChild(img);
    figure.appendChild(figcaption);

    fragment.appendChild(figure);
  });
  renderSection.innerHTML = "";
  renderSection.appendChild(fragment);
}

function createCategories(categoriesData, renderSection) {
  const fragment = new DocumentFragment();

  categoriesData.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    categoryContainer.addEventListener("click", () => {
      location.hash = `category=${category.id}&${category.name}`;
    });

    const categoryName = document.createElement("h3");
    categoryName.classList.add("category-title");
    const categoryNameText = document.createTextNode(category.name);

    categoryName.appendChild(categoryNameText);
    categoryContainer.appendChild(categoryName);

    fragment.appendChild(categoryContainer);
  });
  renderSection.innerHTML = "";
  renderSection.appendChild(fragment);
}

function createMovieDetails(movie) {

  movieDetailsPosterContainer.innerHTML = `<img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="${movie.title}" />`;
  movieImgSection.innerHTML = `<picture>
  <source class="movieImgSection__backdrop" media="(min-width: 768px)" srcset="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}" />
  <img class="movieImgSection__poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
  </picture>`;
  

  /*Movie Info*/
  const movieInfoContainer = document.createElement("div");
  movieInfoContainer.classList.add("movie__info");

  const voteAverage = document.createElement("div");
  voteAverage.classList.add("vote-average");
  voteAverage.innerHTML = movie.vote_average;

  const runtime = document.createElement("div");
  runtime.classList.add("runtime");
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  runtime.innerHTML = `${hours}h ${minutes}m`;


  movieInfoContainer.appendChild(voteAverage);
  movieInfoContainer.appendChild(runtime);

  /*Movie Description*/

  const movieDescriptionContainer = document.createElement("div");
  movieDescriptionContainer.classList.add("movie__description");

  const movieTitle = document.createElement("h1");
  movieTitle.classList.add("title");
  movieTitle.innerHTML = movie.title;

  const movieOverview = document.createElement("p");
  movieOverview.classList.add("overview");
  movieOverview.innerHTML = movie.overview;

  movieDescriptionContainer.appendChild(movieTitle);
  movieDescriptionContainer.appendChild(movieOverview);


  /*Movie Actions*/

  const movieActionsContainer = document.createElement("div");
  movieActionsContainer.classList.add("movie__actions");

  const playVideoBtn = document.createElement("button");
  playVideoBtn.classList.add("button");
  playVideoBtn.innerHTML = `<img src="./assets/play-icon.svg" alt="" /><span>Play Trailer</span>`;
  
  playVideoBtn.addEventListener("click", () => {

      getVideoByMovie(movie.id);
      videoPopup.classList.remove("inactive");

  });

  movieActionsContainer.appendChild(playVideoBtn);


  /*Append sections*/

  movieDetailTextDescription.innerHTML = '';
  movieDetailTextDescription.appendChild(movieInfoContainer);
  movieDetailTextDescription.appendChild(movieDescriptionContainer);
  movieDetailTextDescription.appendChild(movieActionsContainer);
  
}

function createTopMoviePreview(movie) {
  movieImgSection.innerHTML = `<picture>
  <source class="movieImgSection__backdrop" media="(min-width: 768px)" srcset="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}" />
  <img class="movieImgSection__poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" />
  </picture>`;

  /*Movie Info*/
  const movieInfoContainer = document.createElement("div");
  movieInfoContainer.classList.add("movie__info");

  const voteAverage = document.createElement("div");
  voteAverage.classList.add("vote-average");
  voteAverage.innerHTML = movie.vote_average;

  const releaseDate = document.createElement("div");
  releaseDate.classList.add("release_date");
  releaseDate.innerHTML = movie.release_date;

  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.innerHTML = "Trending";

  movieInfoContainer.appendChild(voteAverage);
  movieInfoContainer.appendChild(releaseDate);
  movieInfoContainer.appendChild(tag);

  /*Movie Description*/

  const movieDescriptionContainer = document.createElement("div");
  movieDescriptionContainer.classList.add("movie__description");

  const movieTitle = document.createElement("h1");
  movieTitle.classList.add("title");
  movieTitle.innerHTML = movie.title;

  const movieOverview = document.createElement("p");
  movieOverview.classList.add("overview");
  movieOverview.innerHTML = movie.overview;

  movieDescriptionContainer.appendChild(movieTitle);
  movieDescriptionContainer.appendChild(movieOverview);

  /*Movie Actions*/

  const movieActionsContainer = document.createElement("div");
  movieActionsContainer.classList.add("movie__actions");

  const playVideoBtn = document.createElement("button");
  playVideoBtn.classList.add("button");
  playVideoBtn.innerHTML = `<img src="./assets/play-icon.svg" alt="" /><span>Play Trailer</span>`;
  
  playVideoBtn.addEventListener("click", () => {

      getVideoByMovie(movie.id);
      videoPopup.classList.remove("inactive");

  });

  const detailsMovieBtn = document.createElement("button");
  detailsMovieBtn.classList.add("button");
  detailsMovieBtn.classList.add("button-secondary");
  detailsMovieBtn.innerHTML = `<img src="./assets/info-icon.svg" alt="" /><span>Details</span>`;

  detailsMovieBtn.addEventListener("click", () => {
    location.hash = `movie=${movie.id}&${movie.title}`;
  });

  movieActionsContainer.appendChild(playVideoBtn);
  movieActionsContainer.appendChild(detailsMovieBtn);

  /* Append Sections*/
  topMovieDetailTextDescription.innerHTML = "";
  topMovieDetailTextDescription.appendChild(movieInfoContainer);
  topMovieDetailTextDescription.appendChild(movieDescriptionContainer);
  topMovieDetailTextDescription.appendChild(movieActionsContainer);

}

function createVideoPopup(key) {
  const iframe = `<iframe
  src="https://www.youtube.com/embed/${key}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>;`;

  videoPopupiframe.innerHTML = iframe;
}

/* Video Popup*/


function closeVideoPopup() {
  videoPopupiframe.innerHTML = "";
  videoPopup.classList.add("inactive");
}

videoPopup.addEventListener("click", () => {
  closeVideoPopup();
});
