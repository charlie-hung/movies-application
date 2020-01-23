const $ = require('jquery');

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
                    <div class="small-image-container">
                        <img src="http://placeholder.pics/svg/100x150" alt="">
                    </div>
                </li>`
    });
    return htmlString;
};

const generateStars = (movieRating) => {
    let starString = "";
    for (let i = 0; i < movieRating; i ++) {
        starString += '<i class="fas fa-star"></i>';
    }
    return starString;
};

const addMovie = () => {
    let addMovieTitleEl = $('#add-movie-title');
    if ($(addMovieTitleEl).val()) {
        let movie = {
            title: $(addMovieTitleEl).val(),
            rating: $('#add-movie-rating').val()
        };
        fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then((data) => {
            getMovies().then((movies) => {
                $('.movie-list').html(createMovieString(movies));
            });
        })
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
