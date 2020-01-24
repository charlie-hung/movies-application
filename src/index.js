{
    const $ = require('jquery');
    const { selectedMovie, getMovies, displayAllMovies, createMovieString, addMovie, editMovie, deleteMovie, searchMovies, renderSearchResults, toggleDisable } = require('./api.js');
    const { getImdbMovie, getPoster } = require('./imdb.js')

    $(document).ready(() => {
        $('.movie-list').html('Loading...');

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
            searchMovies();
        });

        $('#nav-icon1').click(function () {
            $(this).toggleClass('open');
            $('.menu-sidebar-container').slideToggle(100).toggleClass('menu-close');
        });

        // getImdbMovie('rush hour 2');
        displayAllMovies();
    });
}
