/* ----- Sections ----- */

const movieImgSection = document.querySelector('#movieImgSection');
const topMovieSection = document.querySelector('#topMovieSection');
const movieDetailsSection = document.querySelector('#movieDetailsSection');
const trendingPreviewSection = document.querySelector('#trendingPreviewSection');
const categoriesPreviewSection = document.querySelector('#categoriesPreviewSection');
const popularPreviewSection = document.querySelector('#popularPreviewSection');
const upcomingPreviewSection = document.querySelector('#upcomingPreviewSection');
const genericListSection = document.querySelector('#genericListSection');


/* ----- Lists & Containers ----- */
const popularMoviesPreviewList = document.querySelector('#popularPreviewSection .movies-preview__list--scroll');
const upcomingMoviesPreviewList = document.querySelector('#upcomingPreviewSection .movies-preview__list--scroll');
const trendingMoviesPreviewList = document.querySelector('#trendingPreviewSection .movies-preview__list--scroll');
const categoriesPreviewList  = document.querySelector('#categoriesPreviewSection .categories-preview__list--scroll');
const movieDetailCategoriesList   = document.querySelector('#movieDetailsSection .categories-preview__list--scroll');
const relatedMoviesContainer    = document.querySelector('#movieDetailsSection .movies-preview__list--scroll');
const genericListCategories    = document.querySelector('#genericListSection .categories-preview__list--scroll');
const genericListMoviesPreview    = document.querySelector('#genericListSection .movies-preview__list');

/* ----- Elements -----*/

const genericListTitle = document.querySelector('#genericListSection .movies-preview__title');
const searchForm = document.querySelector('#searchForm');
const searchFormInput = document.querySelector('#searchForm input');

const trendingBtn  = document.querySelector('#trendingPreview-btn');
const buttonGoBack  = document.querySelectorAll('.buttonBack');

const movieDetailsPoster = document.querySelector('#movieDetailsSection .movie__poster img');
const movieDetailsPopularity = document.querySelector('#movieDetailsSection .movie__info .popularity');
const movieDetailsRuntime = document.querySelector('#movieDetailsSection .movie__info .runtime');
const movieDetailsTag = document.querySelector('#movieDetailsSection .movie__info .tag');
const movieDetailsTitle = document.querySelector('#movieDetailsSection .movie__description .title');
const movieDetailsOverview = document.querySelector('#movieDetailsSection .movie__description .overview');

const movieImgPoster = document.querySelector('#movieImgSection .movieImgSection__poster');
const movieImgBackdrop = document.querySelector('#movieImgSection .movieImgSection__backdrop');

/* - Nav -*/

const navToggleBtn = document.querySelector(".header__nav-toggle");
const headerNav = document.querySelector(".header__nav");
const navSearchToggleBtn = document.querySelector(".header__search-toggle");
const headerSearch = document.querySelector(".header__search");
