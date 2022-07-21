const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesPreview() {
    const {data} = await api('/trending/movie/week');
    
    createMovies(data.results, trendingMoviesPreviewList);
}

async function getMovieCategoriesPreview(){
    const {data} = await api('/genre/movie/list');

    createCategories(data.genres, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
    const {data} = await api('/discover/movie?with-genres=', {
        params: {
            with_genres: id,
        }
    });
    
    createMovies(data.results, genericListMoviesPreview);

}

async function getPopularMovies() {
    const {data} = await api('/movie/popular');

    createMovies(data.results, popularMoviesPreviewList);
    
}
async function getUpcomingMovies() {
    const {data} = await api('/movie/upcoming');

    createMovies(data.results, upcomingMoviesPreviewList);
    
}

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

function createMovies(moviesData, renderSection){
    const fragment = new DocumentFragment();
    moviesData.forEach(movie => {
        
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
    renderSection.innerHTML = '';
    renderSection.appendChild(fragment);
}

function createCategories(categoriesData, renderSection) {
    const fragment = new DocumentFragment();

    categoriesData.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        categoryContainer.addEventListener('click', () => {
            location.hash = `category=${category.id}&${category.name}`;
        })

        const categoryName = document.createElement('h3');
        categoryName.classList.add('category-title');
        const categoryNameText = document.createTextNode(category.name);

        categoryName.appendChild(categoryNameText);
        categoryContainer.appendChild(categoryName);

        fragment.appendChild(categoryContainer);
    });
    renderSection.innerHTML = '';
    renderSection.appendChild(fragment);
}