const $ = require('jquery');
const {getImdbMovie, getPoster} = require('./imdb.js');

// VARIABLE DECLARATIONS
let selectedMovie = {
    id: 0
};

const getMovies = () => {
    return fetch('/api/movies')
        .then(response => {
            return response.json();
        });
};

/*-----Creates an 'li' string for each movie-----*/
const createMovieString = (moviesObj) => {
    let htmlString = '';
    moviesObj.forEach((movie) => {
        htmlString += `<li class="single-movie-container">
                    <div class="small-details-container">
                        <p class="movie-title">${movie.title}</p>
                        <p class="movie-rating">${generateStars(movie.rating)}</p>
                    </div>
<!--                    <div class="small-image-container">-->
                        <img class="movie-img-small" src="${movie.poster_url}" alt="">
<!--                    </div>-->
                </li>`
    });
    return htmlString;
};

const generateStars = (movieRating) => {
    let starString = "";
    for (let i = 0; i < movieRating; i++) {
        starString += `<img src="./popcorn.png" alt="" class="popcorn">`;
    }
    return starString;
};

const addMovie = () => {
    let addMovieTitleEl = $('#add-movie-title');
    if ($(addMovieTitleEl).val()) {
        getImdbMovie($(addMovieTitleEl).val()).then((movie)=> {
            console.log(movie);
            let movieObj = {
                "title": movie.title.trim(),
                "rating": $('#add-movie-rating').val(),
                "imdb-id": movie.id,
                "poster_url": movie.poster
            };
            fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieObj)
            }).then((data) => {
                getMovies().then((movies) => {
                    $('.movie-list').html(createMovieString(movies));
                });
            })
        });
    }
};

const editMovie = () => {
    let movieChanges = {
        title: $('#edit-movie-title').val(),
        rating: $('#edit-movie-rating').val()
    };
    console.log(movieChanges);
    fetch(`/api/movies/${selectedMovie.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieChanges)
    }).then((data) => {
        console.log(data.json());
        getMovies().then((movies) => {
            $('.movie-list').html(createMovieString(movies));
        });
    });
};

const deleteMovie = () => {
    fetch(`/api/movies/${selectedMovie.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        console.log(data.json());
        getMovies().then((movies) => {
            $('.movie-list').html(createMovieString(movies));
        });
    });
};
// SEARCH MOVIE FUNCTIONALITY //
const searchMovies = () => {
    let searchResults = [];
    getMovies().then((movies) => {
        if ($('#movie-search').val()) {
            movies.forEach((movie) => {
                if (movie.title.toLowerCase().includes($('#movie-search').val().toLowerCase())) searchResults.push(movie);
            });
        }
        renderSearchResults(searchResults);
    })
};

const renderSearchResults = (results) => {
    let htmlString = "";
    results.forEach((result) => htmlString += `<li class="search-result-item" movie-id="${result.id}">${result.title}</li>`);
    $('.search-results-list').html(htmlString);
    $('.search-result-item').click(function () {
        selectedMovie.id = $(this).attr('movie-id');
        $('#edit-movie-title').val($(this).html());
    });
};

const toggleDisable = () => {
    $('#add-button').attr('disabled', (index, attr) => {
        return attr === 'disabled' ? null : 'disabled';
    });
    $('#search-button').attr('disabled', (index, attr) => {
        return attr === 'disabled' ? null : 'disabled';
    });
    $('#edit-button').attr('disabled', (index, attr) => {
        return attr === 'disabled' ? null : 'disabled';
    });
    $('#delete-button').attr('disabled', (index, attr) => {
        return attr === 'disabled' ? null : 'disabled';
    });
};

module.exports = {
    selectedMovie,
    getMovies,
    createMovieString,
    addMovie,
    editMovie,
    deleteMovie,
    searchMovies,
    renderSearchResults,
    toggleDisable
};
