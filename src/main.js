const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

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
  console.log(topMovie.id);
  createTopMoviePreview(topMovie);
  createMovies(movies, trendingMoviesPreviewList);
  
}

async function hola(){
    const {data} = await api(`/movie/725201/videos`);
    console.log(data.results)
}
hola();
function createTopMoviePreview(movie) {
  movieImgBackdrop.srcset =
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
    movie.backdrop_path;
  movieImgPoster.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

  topMovieDetailsTitle.textContent = movie.title;
  topMovieDetailsOverview.textContent = movie.overview;
  topMovieDetailsReleaseDate.textContent = movie.release_date;
  topMovieDetailsVoteAverage.textContent = movie.vote_average;
  topMovieDetailsbtn.addEventListener('click', () => {
    location.hash = `movie=${movie.id}&${movie.title}`;
  })
}

async function getTrendingMoviesList() {
  const { data } = await api("/trending/movie/week");

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

navLinkbtns.forEach(link => {
    link.addEventListener('click', ()=>{
        toggleMenuNav();
    })
})

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
  movieDetailsPoster.src =
    "https://image.tmdb.org/t/p/w342/" + movie.poster_path;
  movieImgBackdrop.srcset =
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
    movie.backdrop_path;
  movieImgPoster.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

  movieDetailsVoteAverage.textContent = movie.vote_average;

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  movieDetailsRuntime.textContent = `${hours}h ${minutes}m`;

  movieDetailsTitle.textContent = movie.title;
  movieDetailsOverview.textContent = movie.overview;
}
