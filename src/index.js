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
        });

        $('#menu-search').keyup(() => {
            console.log("here");
        });

        $('#nav-icon1').click(function () {
            $(this).toggleClass('open');
        });

        getImdbMovie('rush hour 2');
    });
}
