let page = 1;
let maxPage;
let infiniteScroll;
let endpointInfiniteScroll;
let infiniteScrollParams = {
  params: {
    page: 1,
  },
};


searchForm.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();  

    if(searchFormInput.value){

      location.hash = "search=" + searchFormInput.value;
      toggleSearchSection();
    }
  }
  
});


trendingBtn.addEventListener('click', () => location.hash = 'trends');
popularBtn.addEventListener('click', () => location.hash = 'popular');
upcomingBtn.addEventListener('click', () => location.hash = 'upcoming');

buttonGoBack.forEach(btn => btn.addEventListener('click', () => {
  (document.domain != location.origin) ? location.hash = '' : history.back();
}));

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);


function navigator() {
  document.documentElement.scrollTop = 0;
  // document.body.scrollTop = 0;


  if(infiniteScroll){
    window.removeEventListener('scroll', infiniteScroll, {passive: false});
    infiniteScroll = undefined;
    page = 1;
    maxPage = 0;
    endpointInfiniteScroll = undefined;
    infiniteScrollParams = {
      params: {
        page: 1,
      },
    };
  }

  location.hash.startsWith("#trends")
    ? trendsPage()
    : location.hash.startsWith("#popular")
    ? popularPage()
    : location.hash.startsWith("#upcoming")
    ? upcomingPage()
    : location.hash.startsWith("#search=")
    ? searchPage()
    : location.hash.startsWith("#movie=")
    ? movieDetailsPage()
    : location.hash.startsWith("#category=")
    ? categoriesPage()
    : homePage();

    if(infiniteScroll){
      window.addEventListener('scroll', infiniteScroll, false);
    }

}

function homePage() {
  movieImgSection.classList.remove("inactive");
  topMovieSection.classList.remove("inactive");
  movieDetailsSection.classList.add("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  popularPreviewSection.classList.remove("inactive");
  upcomingPreviewSection.classList.remove("inactive");
  genericListSection.classList.add("inactive");
  likedPreviewSection.classList.remove("inactive");
  getTrendingMoviesPreview();
  getMovieCategoriesPreview();
  getPopularMovies();
  getUpcomingMovies();
  getLikedMoviesList();
  searchFormInput.value = '';
}

function categoriesPage() {
  movieImgSection.classList.add("inactive");
  topMovieSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  genericListCategories.classList.remove("inactive");
  likedPreviewSection.classList.add("inactive");


  const [ , categoryData] = location.hash.split('=');
  const [idCategory, nameCategory] = categoryData.split('&');

  genericListTitle.innerHTML = decodeURI(nameCategory);

  getMoviesByCategory(idCategory);
  getMovieCategoriesPreview();

  infiniteScroll = getInfiniteMoviesList;
}

function movieDetailsPage() {
  movieImgSection.classList.remove("inactive");
  topMovieSection.classList.add("inactive");
  movieDetailsSection.classList.remove("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericListSection.classList.add("inactive");
  likedPreviewSection.classList.add("inactive");


  const [, hashData] = location.hash.split('=');
  const [movieId, ] = hashData.split('&');

  getMovieDetailsById(movieId);
}

function searchPage() {
  movieImgSection.classList.add("inactive");
  topMovieSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  genericListCategories.classList.add("inactive");
  likedPreviewSection.classList.add("inactive");


  const [ , searchData] = location.hash.split('=');

  genericListTitle.innerHTML = 'Results for: ' + decodeURI(searchData);
  getMoviesBySearch(searchData);
  infiniteScroll = getInfiniteMoviesList;

}

async function trendsPage() {
  homeCategoriesView('Trending')
  getTrendingMoviesList();

  infiniteScroll = getInfiniteMoviesList;
}
function popularPage() {
  homeCategoriesView('Popular')
  getPopularMoviesList();

  infiniteScroll = getInfiniteMoviesList;
}
function upcomingPage() {
  homeCategoriesView('Upcoming')
  getUpcomingMoviesList();

  infiniteScroll = getInfiniteMoviesList;
}


function homeCategoriesView(categoryName){
  movieImgSection.classList.add("inactive");
  topMovieSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  genericListCategories.classList.add("inactive");
  genericListTitle.innerHTML = categoryName;
  likedPreviewSection.classList.add("inactive");

}