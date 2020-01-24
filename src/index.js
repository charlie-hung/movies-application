{
    const $ = require('jquery');
    const {selectedMovie, getMovies, displayAllMovies, createMovieString, addMovie, editMovie, deleteMovie, searchMovies, renderSearchResults, toggleDisable, renderLoading} = require('./api.js');
    const {getImdbMovie, getPoster} = require('./imdb.js')

    $(document).ready(() => {
        renderLoading();
        //INITIALLY HIDES THE CONTAINERS
        $('.add-movie-container').slideToggle();
        $('.edit-movie-container').slideToggle();

        //EVENT LISTENERS
        $('#add-button').click((e) => {
            e.preventDefault();
            renderLoading();
            addMovie();
        });

        $('#search-button').click((e) => {
            e.preventDefault();
            searchMovies();
        });

        $('#edit-button').click(() => {
            renderLoading();
            editMovie();
        });


        $('#delete-button').click(() => {
            renderLoading();
            deleteMovie();
        });

        $('#movie-search').keyup(() => {
            searchMovies();
        });

        $('#menu-search').keyup(() => {
            renderLoading();
            searchMovies();
        });

        $('#nav-icon1').click(function () {
            $(this).toggleClass('open');
            $('.menu-sidebar-container').slideToggle(100).toggleClass('menu-close');
        });

        $('.add-movie').click(() => {
            $('.add-movie-container').slideToggle(100);
        });
        $('.edit-movie').click(() => {
            $('.edit-movie-container').slideToggle(100);
        });

        // getImdbMovie('rush hour 2');
        displayAllMovies();
    });
}
