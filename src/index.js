{
    const $ = require('jquery');
    const { selectedMovie, getMovies, createMovieString, addMovie, editMovie, deleteMovie, searchMovies, renderSearchResults, toggleDisable } = require('./api.js');
    const { getImdbMovie, getPoster } = require('./imdb.js')

    $(document).ready(() => {
        $('.movie-list').html('Loading...');
        getMovies().then((movies) => {
            $('.movie-list').html(createMovieString(movies));
            Promise.resolve().then(response => "Success: " + response);
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });

        //EVENT LISTENERS
        $('#add-button').click((e) => {
            e.preventDefault();
            addMovie();
        });

        $('#search-button').click((e) => {
            e.preventDefault();
            searchMovies();
        });

        $('#edit-button').click(() => {
            editMovie();
        });


        $('#delete-button').click(() => {
            deleteMovie();
        });

        $('#movie-search').keyup(() => {
            searchMovies();
        })

        getImdbMovie('rush hour 2');
        // getPoster('121212nbhbgb');
        // getPoster('rush hour 2');
    });
}
