const $ = require('jquery');
const { getImdbMovie, getPoster } = require('./imdb.js');

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

const displayAllMovies = () => {
    getMovies().then((movies) => {
        $('.movie-list').html(createMovieString(movies));
        activateMovieList();
        Promise.resolve().then(response => "Success: " + response);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

/*-----Creates an 'li' string for each movie-----*/
const createMovieString = (moviesObj) => {
    let htmlString = '';
    moviesObj.forEach((movie) => {
        htmlString += `<li class="single-movie-container" movie-id="${movie.id}">
                    <div class="small-details-container">
                        <p class="movie-title">${movie.title}</p>
                        <p class="movie-rating">${generateStars(movie.rating)}</p>
                    </div>
                    <img class="movie-img-small" src="${movie.poster_url}" alt="">
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
        getImdbMovie($(addMovieTitleEl).val()).then((movie) => {
            console.log(movie);
            let movieObj;
            if (movie.id === "") {
                movieObj = {
                    "title": $(addMovieTitleEl).val().trim(),
                    "rating": $('#add-movie-rating').val(),
                    "imdb-id": "",
                    "poster_url": './no-poster-available.jpg'
                };
            } else {
                movieObj = {
                    "title": movie.title.trim(),
                    "rating": $('#add-movie-rating').val(),
                    "imdb-id": movie.id,
                    "poster_url": `${movie.poster || './no-poster-available.jpg'}`
                };
            }

            fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieObj)
            }).then((data) => {
                getMovies().then((movies) => {
                    $('.movie-list').html(createMovieString(movies));
                    activateMovieList();
                });
            })
        });
    }
};

const editMovie = () => {
    let movieChanges = {
        "title": $('#edit-movie-title').val(),
        "rating": $('#edit-movie-rating').val(),
        "imdb-id": "",
        "poster_url": './no-poster-available.jpg'
    };
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
            activateMovieList();
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
            activateMovieList();
        });
    });
};
// SEARCH MOVIE FUNCTIONALITY //
const searchMovies = () => {
    let searchResults = [];
    getMovies().then((movies) => {
        if ($('#menu-search').val()) {
            movies.forEach((movie) => {
                if (movie.title.toLowerCase().includes($('#menu-search').val().toLowerCase())) searchResults.push(movie);
            });
            renderSearchResults(searchResults);
        }
        else displayAllMovies();
    })
};

const renderSearchResults = (results) => {
    $('.movie-list').html(createMovieString(results));
    activateMovieList();
};

const renderLoading = () => {
    $('.movie-list').html(`<h1 class="loading animated flash">LOADING...</h1>`);
};

const activateMovieList = () => {
    $('.single-movie-container').click(function () {
        let movieListEl = $('.movie-list');
        for (let i = 0; i < $(movieListEl).children().length; i++) {
            $(movieListEl).children(i).removeClass('active');
        }
        $(this).addClass('active');
        selectedMovie.id = $(this).attr('movie-id');
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
    displayAllMovies,
    createMovieString,
    addMovie,
    editMovie,
    deleteMovie,
    searchMovies,
    renderSearchResults,
    toggleDisable,
    renderLoading
};
