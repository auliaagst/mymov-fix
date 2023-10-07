import './styles.css';

document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query !== '') {
            searchMovies(query);
            hideMovieDetails();
        } else {
            showMovieDetails();
            showH2('popularMovies');
            showH2('latestMovies');  
        }
    });
});

const fetchMovieDetails = async (id) => {
    try {
        const apiKey = 'd5f7da8591c555f55a613aeaf14ca5cb';
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayMovieDetails(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const displayMovieDetails = (movie) => {
    const moviePoster = document.getElementById('moviePoster');
    const movieTitle = document.getElementById('movieTitle');
    const movieYear = document.getElementById('movieYear');
    const movieRating = document.getElementById('movieRating');
    const movieDescription = document.getElementById('movieDescription');

    if (moviePoster && movieTitle && movieYear && movieRating && movieDescription) {
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieTitle.innerHTML = movie.title;
        movieYear.innerHTML = `Tahun: ${movie.release_date.split('-')[0]}`;
        movieRating.innerHTML = `Rating: ${movie.vote_average}`;
        movieDescription.innerHTML = movie.overview;
    }
};

const hideMovieDetails = () => {
    const detailContainer = document.querySelector('.container');
    detailContainer.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies();
    fetchLatestMovies();

    const hidePopularAndLatest = () => {
        document.getElementById('popularMovies').style.display = 'none';
        document.getElementById('latestMovies').style.display = 'none';
        document.getElementById('searchResults').style.display = 'flex';
    };

    const displayPopularAndLatest = () => {
        document.getElementById('popularMovies').style.display = 'flex';
        document.getElementById('latestMovies').style.display = 'flex';
        document.getElementById('searchResults').style.display = 'none';
    };

    document.getElementById('search').addEventListener('input', function() {
        const query = this.value.trim();

        if (query !== '') {
            fetchMovies(query);
            hidePopularAndLatest();
        } else {
            displayPopularAndLatest();
        }
    });
});

const fetchPopularMovies = async () => {
    const apiKey = 'd5f7da8591c555f55a613aeaf14ca5cb';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const data = await fetchData(url);
    if (data) {
        displayMovies(data.results, 'popularMovies');
    }
};

const fetchLatestMovies = async () => {
    const apiKey = 'd5f7da8591c555f55a613aeaf14ca5cb';
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    const data = await fetchData(url);
    if (data) {
        displayMovies(data.results, 'latestMovies');
    }
};

const fetchMovies = async (query) => {
    const apiKey = 'd5f7da8591c555f55a613aeaf14ca5cb';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    const data = await fetchData(url);
    if (data) {
        hideH2('popularMovies');
        hideH2('latestMovies');
        displayMovies(data.results, 'searchResults');
    }
};

const searchMovies = async (query) => {
    try {
        const apiKey = 'd5f7da8591c555f55a613aeaf14ca5cb'; 
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, 'searchResults');
    } catch (error) {
        console.error('Error:', error);
    }
};

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

const displayMovies = (movies, containerId) => {
    const movieContainer = document.getElementById(containerId);

    if (movieContainer) {
        showH2(containerId);
        movieContainer.innerHTML = '';

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.release_date.split('-')[0]}</p>
            `;
            card.addEventListener('click', () => showMovieDetails(movie));
            movieContainer.appendChild(card);
        });
    }
};

const showMovieDetails = (movie) => {
    if (movie && movie.id) {
        const { id } = movie;
        window.location.href = `detail.html?id=${id}`;
        const detailContainer = document.querySelector('.container');
        if (detailContainer) {
            detailContainer.style.display = 'block';
        }
    } else {
        console.error('Movie data is invalid or undefined');
    }
};

const hideH2 = (containerId) => {
    const h2Element = document.getElementById(`${containerId}Title`);
    if (h2Element) {
        h2Element.style.display = 'none';
    }
};

const showH2 = (containerId) => {
    const h2Element = document.getElementById(`${containerId}Title`);
    if (h2Element) {
        h2Element.style.display = 'block';
    }
};

class MyFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const footer = document.createElement('footer');
        footer.textContent = 'Aulia Augusta, 2023';
        shadow.appendChild(footer);

        const style = document.createElement('style');
        style.textContent = `
            footer {
                background-color: #24243e;
                color: #ffff;
                padding: 15px;
                text-align: center;
            }
        `;
        shadow.appendChild(style);
    }
}

customElements.define('my-footer', MyFooter);
