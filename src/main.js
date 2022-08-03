//data
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
function likedMovieList(){
  const item = localStorage.getItem('liked-movies');
  let movies;
  if(item){
    movies = JSON.parse(item);
    
  }else{
    movies = {};
  }
  return movies;
}
function likeMovie(movie) {
  const likedMovies = likedMovieList();

  if (likedMovies[movie.id]) {
    delete likedMovies[movie.id]
  }else{
    likedMovies[movie.id] = movie;
  }
  localStorage.setItem('liked-movies', JSON.stringify(likedMovies));

  if(location.hash == ''){
    homePage();
  }

}

/* API functions*/

async function getMoviesBySearch(query) {
  const urlAPI = "/search/movie";
  const encoded = encodeURI(query);
  infiniteScrollParams = {
    params: {
      query: encoded,
    },
  }
  const { data } = await api(urlAPI, infiniteScrollParams);
  endpointInfiniteScroll = urlAPI;
  maxPage = data.total_pages;
  createMovies(data.results, genericListMoviesPreview);
}

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const [topMovie, ...movies] = data.results;

  createTopMoviePreview(topMovie);
  createMovies(movies, trendingMoviesPreviewList);
}

async function getTrendingMoviesList() {
  const urlAPI = "/trending/movie/week";
  const { data } = await api(urlAPI);
  endpointInfiniteScroll = urlAPI;
  maxPage = data.total_pages;

  createMovies(data.results, genericListMoviesPreview);
  
  // const btnLoadMore = document.createElement("button");
  // btnLoadMore.classList.add("button");
  // btnLoadMore.innerText = "Cargar Más";

  // btnLoadMore.addEventListener("click", (e) => {
  //   e.srcElement.remove();
  //   getPaginatedTrendingMoviesList();
  // });

  // genericListMoviesPreview.appendChild(btnLoadMore);
  
}

async function getPopularMoviesList() {
  const urlAPI = "/movie/popular";
  const { data } = await api(urlAPI);
  endpointInfiniteScroll = urlAPI;
  maxPage = data.total_pages;

  createMovies(data.results, genericListMoviesPreview);
}
async function getUpcomingMoviesList() {
  const urlAPI = "/movie/upcoming";
  const { data } = await api(urlAPI);
  endpointInfiniteScroll = urlAPI;
  maxPage = data.total_pages;

  createMovies(data.results, genericListMoviesPreview);
}

function getLikedMoviesList() {
  const likedMovies = likedMovieList();
  const moviesArray = Object.values(likedMovies);
  (moviesArray.length == 0) ? likedMoviesPreviewList.innerHTML = `<p style="width:100%; text-align:center;padding:10.8rem 3.2rem;">You don't have liked movies</p>` :
  createMovies(moviesArray, likedMoviesPreviewList);
}

async function getInfiniteMoviesList() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollIsBottom = (scrollTop + clientHeight >= scrollHeight - 200);

  const pageIsNotMax = (page < maxPage);

  if (scrollIsBottom && pageIsNotMax) {

    page++;

    infiniteScrollParams.params.page = page;
    
    const { data } = await api(endpointInfiniteScroll, infiniteScrollParams);

    createMovies(data.results, genericListMoviesPreview, {
      cleanSection: false,
    });

  }
  


  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.classList.add('button');
  // btnLoadMore.innerText = "Cargar Más";

  // btnLoadMore.addEventListener('click', (e) => {
  //   e.srcElement.remove();
  //   getPaginatedTrendingMoviesList();
  // });

  // genericListMoviesPreview.appendChild(btnLoadMore);
}

async function getMovieCategoriesPreview() {
  const { data } = await api("/genre/movie/list");

  createCategories(data.genres, categoriesPreviewList);
  createCategories(data.genres, genericListCategories);
}

async function getMoviesByCategory(id) {
  const urlAPI = "/discover/movie?with-genres=";
  infiniteScrollParams = {
    params: {
      with_genres: id,
    },
  }
  const { data } = await api(urlAPI, infiniteScrollParams);
  endpointInfiniteScroll = urlAPI;
  maxPage = data.total_pages;

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

function createMovies(moviesData, renderSection, { cleanSection = true } = {}) {

  const fragment = new DocumentFragment();
  moviesData.forEach((movie) => {
    const figure = document.createElement("figure");
    figure.classList.add("movie-container");
    

    const img = document.createElement("img");
    img.classList.add("movie-container__img");
    img.setAttribute(
      "data-image",
      `https://image.tmdb.org/t/p/w154${movie.poster_path}`
    );
    img.setAttribute("alt", `${movie.title}`);
    img.setAttribute("width", `200`);
    img.setAttribute("height", `300`);

    if (movie.poster_path === null) {
      img.setAttribute(
        "data-image",
        `https://via.placeholder.com/200x300/191919/ffffff?text=${encodeURI(
          movie.title
        )}`
      );
    }
    img.addEventListener("click", () => {
      location.hash = `movie=${movie.id}&${movie.title}`;
    });

    lazyLoad.observe(img);

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("movie-container__title");
    const figcaptionText = document.createTextNode(movie.title);
    figcaption.appendChild(figcaptionText);

    const btn = document.createElement('button');
    btn.classList.add('movieBtnLike', 'button-secondary', 'button', 'button--small');
    const likedMovies = likedMovieList();

    if (likedMovies[movie.id]) {
      btn.classList.add('movieBtnLike--liked');
    }

    btn.addEventListener('click', () => {
      btn.classList.toggle('movieBtnLike--liked');

      likeMovie(movie);
    })

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(btn);

    fragment.appendChild(figure);
  });

  if (cleanSection) {
    renderSection.innerHTML = "";
  }

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

  movieDetailTextDescription.innerHTML = "";
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

/*LayLoad*/

const lazyLoad = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const imgURL = img.getAttribute("data-image");
        img.src = imgURL;
        img.classList.add("movie-container__img--loaded");
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  }
);
