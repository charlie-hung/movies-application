{
    const $ = require('jquery');
    const {getMovies} = require('./api.js');

    $(document).ready(() => {
        // VARIABLE DECLARATIONS
        let selectedMovie = {
            id: 0
        };


        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            $('.movie-list').html(createMovieString(movies));
            Promise.resolve();
        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
        /*-----Creates an 'li' string for each movie-----*/
        let createMovieString = (moviesObj) => {
            let htmlString = '';
            moviesObj.forEach((movie) => {
                htmlString += `<li class="single-movie">
                <p class="movie-title">${movie.title}</p>
                <p class="movie-rating">${movie.rating}</p>
                <p class="movie-id">${movie.id}</p>
                </li>`
            });
            return htmlString;
        };

        let addMovie = () => {
            if ($('#add-movie-title').val()) {
                let movie = {
                    title: $('#add-movie-title').val(),
                    rating: $('#add-movie-rating').val()
                };
                // console.log(movie);
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

        // SEARCH MOVIE FUNCTIONALITY //
        let searchMovies = () => {
            let searchResults = [];
            getMovies().then((movies) => {
                if ($('#movie-search').val()) {
                    movies.forEach((movie) => {
                        if (movie.title.toLowerCase().includes($('#movie-search').val().toLowerCase())) searchResults.push(movie);
                    });
                }
                renderSearchResults(searchResults);
            })};

        let renderSearchResults = (results) => {
            let htmlString = "";
            results.forEach((result)=> htmlString += `<li class="search-result-item" movie-id="${result.id}">${result.title}</li>`);
            $('.search-results-list').html(htmlString);
            $('.search-result-item').click(function () {
               selectedMovie.id = $(this).attr('movie-id');
               $('#edit-movie-title').val($(this).html());
            });
        };

        let toggleDisable = () => {
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

        //EVENT LISTENERS
        $('#add-button').click((e) => {
            e.preventDefault();
            addMovie();
        });

        $('#search-button').click((e) => {
            e.preventDefault();
            searchMovies();
        });

        $('#edit-button').click(()=> {
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
        });

        $('#delete-button').click(()=> {
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
        });

        $('#movie-search').keyup(() => {
            searchMovies();
        })
    });
}
