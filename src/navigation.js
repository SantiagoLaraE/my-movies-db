searchForm.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();  
    location.hash = "search=" + searchFormInput.value;
  }
});
trendingBtn.addEventListener('click', () => location.hash = 'trends');
buttonGoBack.forEach(btn => btn.addEventListener('click', () => history.back()));

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  location.hash.startsWith("#trends")
    ? trendsPage()
    : location.hash.startsWith("#search=")
    ? searchPage()
    : location.hash.startsWith("#movie=")
    ? movieDetailsPage()
    : location.hash.startsWith("#category=")
    ? categoriesPage()
    : homePage();
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
  getTrendingMoviesPreview();
  getMovieCategoriesPreview();
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
  console.log("CATEGORIES");
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
}

function trendsPage() {
  movieImgSection.classList.add("inactive");
  topMovieSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  popularPreviewSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericListSection.classList.remove("inactive");
  genericListCategories.classList.add("inactive");
}
