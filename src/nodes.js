/* ----- Sections ----- */

const movieImgSection = document.querySelector('#movieImgSection');
const topMovieSection = document.querySelector('#topMovieSection');
const movieDetailsSection = document.querySelector('#movieDetailsSection');
const trendingPreviewSection = document.querySelector('#trendingPreviewSection');
const categoriesPreviewSection = document.querySelector('#categoriesPreviewSection');
const popularPreviewSection = document.querySelector('#popularPreviewSection');
const upcomingPreviewSection = document.querySelector('#upcomingPreviewSection');
const genericListSection = document.querySelector('#genericListSection');
const videoPopup = document.querySelector('#video_popup');


/* ----- Lists & Containers ----- */
const popularMoviesPreviewList = document.querySelector('#popularPreviewSection .movies-preview__list--scroll');
const upcomingMoviesPreviewList = document.querySelector('#upcomingPreviewSection .movies-preview__list--scroll');
const trendingMoviesPreviewList = document.querySelector('#trendingPreviewSection .movies-preview__list--scroll');
const categoriesPreviewList  = document.querySelector('#categoriesPreviewSection .categories-preview__list--scroll');
const movieDetailCategoriesList   = document.querySelector('#movieDetailsSection .categories-preview__list--scroll');
const movieDetailActionsContainer = document.querySelector('#movieDetailsSection .movie__actions');
const topMovieDetailActionsContainer = document.querySelector('#topMovieSection .movie__actions');
const relatedMoviesContainer    = document.querySelector('#movieDetailsSection .movies-preview__list--scroll');
const genericListCategories    = document.querySelector('#genericListSection .categories-preview__list--scroll');
const genericListMoviesPreview    = document.querySelector('#genericListSection .movies-preview__list');

/* ----- Elements -----*/
const videoPopupiframe = document.querySelector('#video_popup .iframeWrapper');
const playVideoBtnMovieDetail = document.querySelector('#movieDetailsSection .playVideoBtn');
const playVideoBtnTopMovieDetail = document.querySelector('#topMovieSection .playVideoBtn');
const playVideoBtns = document.querySelectorAll('.playVideoBtn');
const navLinkbtns = document.querySelectorAll('.header__nav .nav-links');

const genericListTitle = document.querySelector('#genericListSection .movies-preview__title');
const searchForm = document.querySelector('#searchForm');
const searchFormInput = document.querySelector('#searchForm input');

const trendingBtn  = document.querySelector('#trendingPreview-btn');
const popularBtn  = document.querySelector('#popularPreview-btn');
const upcomingBtn  = document.querySelector('#upcomingPreview-btn');
const buttonGoBack  = document.querySelectorAll('.buttonBack');

const topMovieDetailTextDescription = document.querySelector('#topMovieSection .movie__text .movie__text__details');
const movieDetailTextDescription = document.querySelector('#movieDetailsSection .movie__text .movie__text__details');

const movieDetailsPoster = document.querySelector('#movieDetailsSection .movie__poster img');
const movieDetailsPosterContainer = document.querySelector('#movieDetailsSection .movie__poster');
const movieDetailsVoteAverage = document.querySelector('#movieDetailsSection .movie__info .vote-average');
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
