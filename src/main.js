import { API_KEY } from "./secrets.js";

const API_URL = 'https://api.themoviedb.org/3';



async function getTrendingMoviesPreview() {
    const response = await fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    
    const movies = data.results;

    const listContainer = document.querySelector('.trending-movies .movies-preview__list--scroll');
    const fragment = new DocumentFragment();
    
    movies.forEach(movie => {
        
        const figure = document.createElement('figure');
        figure.classList.add('movie-container');

        const img = document.createElement('img');
        img.classList.add('movie-container__img');
        img.setAttribute('src', `https://image.tmdb.org/t/p/w154${movie.poster_path}`);
        img.setAttribute('alt', `${movie.title}`);

        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('movie-container__title');
        const figcaptionText = document.createTextNode(movie.title);
        figcaption.appendChild(figcaptionText);

        figure.appendChild(img);
        figure.appendChild(figcaption);

        fragment.appendChild(figure);
    });
    listContainer.appendChild(fragment);


    // 

}

getTrendingMoviesPreview();





// <div class="category-container">
// <h3 class="category-title">Action</h3>
// </div>


async function getMovieCategoriesPreview(){
    const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json()
    const categories = data.genres;

    const listContainer = document.querySelector('.categories-preview .categories-preview__list--scroll');
    const fragment = new DocumentFragment();

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryName = document.createElement('h3');
        categoryName.classList.add('category-title');
        const categoryNameText = document.createTextNode(category.name);

        categoryName.appendChild(categoryNameText);
        categoryContainer.appendChild(categoryName);

        fragment.appendChild(categoryContainer);
    });
    listContainer.appendChild(fragment);
}

getMovieCategoriesPreview()





navToggleBtn.addEventListener('click', function () {
    if(headerNav.classList.contains('open')){
        headerNav.classList.remove('open');
        this.classList.remove('open');
    }else{
        this.classList.add('open');
        headerNav.classList.add('open');
    }
});

navSearchToggleBtn.addEventListener('click', function () {
    if(headerSearch.classList.contains('open')){
        headerSearch.classList.remove('open');
        this.classList.remove('open');
    }else{
        this.classList.add('open');
        headerSearch.classList.add('open');
    }
});