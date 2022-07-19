window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  const hash = location.hash;
  if (hash.startsWith('#trends')) {
    trendsPage();
  } else if (hash.startsWith('#search=')) {
    searchPage();
  } else if (hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
}

navigator();

function homePage() {
  console.log('HOME');
  getTrendingMoviesPreview();
  getMovieCategoriesPreview();
}

function categoriesPage() {
  console.log('CATEGORIES');
}

function movieDetailsPage() {
  console.log('MOVIE DETAILS');
}
function searchPage() {
  console.log('SEARCH');
}
function trendsPage() {
  console.log('TRENDS');
}
