import movies from './movie.js';

let moviesList = document.querySelector('.containerMovie');
let genreFilter = document.getElementById('movie-type');
let searchInput = document.getElementById('searchmovie');
let searchButton = document.getElementById('search-btn');
let sortSelect = document.getElementById('sort-movie');

function generator(movies) {
    moviesList.innerHTML = '';
    if (movies.length === 0) {
        moviesList.innerHTML = '';
        return;
    }
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="1200x675mf.jpg.png" alt="${movie.Title}" class="movie-img">
            <div class="card-content">
                <h1 class="movie-title">${movie.Title}</h1>
                <div class="movie-info">
                    <span class="rating">${movie.imdb_rating} ⭐</span>
                    <span>${movie.movie_year}</span>
                    <span>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m</span>
                </div>
                <p class="movie-genre">${movie.Categories}</p>
                <button class="more-info-btn">More info</button>
            </div>
        `;
        moviesList.appendChild(card);
    });
}

function sortMovies(movies, sortType) {
    const sortedMovies = [...movies]; // ✅ ИСПРАВЛЕНО: создаем копию массива
    
    if (sortType === 'az') {
        sortedMovies.sort((a, b) => a.Title.toString().localeCompare(b.Title));
    } else if (sortType === 'za') {
        sortedMovies.sort((a, b) => b.Title.toString().localeCompare(a.Title));
    } else if (sortType === 'rating-desc') {
        sortedMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
    } else if (sortType === 'rating-asc') {
        sortedMovies.sort((a, b) => a.imdb_rating - b.imdb_rating);
    } else if (sortType === 'year-desc') {
        sortedMovies.sort((a, b) => b.movie_year - a.movie_year);
    } else if (sortType === 'year-asc') {
        sortedMovies.sort((a, b) => a.movie_year - b.movie_year);
    }
    
    return sortedMovies;
}

function filterMovies() {
    let filteredMovies = movies;
    
    const searchValue = searchInput.value.toLowerCase().trim();
    if (searchValue) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Title.toString().toLowerCase().includes(searchValue)
        );
    }
    
    const selectedGenre = genreFilter.value.toLowerCase();
    if (selectedGenre !== 'all') {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Categories.toLowerCase().includes(selectedGenre)
        );
    }
    
    const sortType = sortSelect.value;
    if (sortType !== 'none') {
        filteredMovies = sortMovies(filteredMovies, sortType);
    }
    
    generator(filteredMovies);
}

searchButton.addEventListener('click', filterMovies);
searchInput.addEventListener('input', filterMovies);
genreFilter.addEventListener('change', filterMovies);
sortSelect.addEventListener('change', filterMovies);

generator(movies);