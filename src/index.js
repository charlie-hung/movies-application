{
    const $ = require('jquery');
    const {getMovies} = require('./api.js');

    $(document).ready(() => {
        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            movies.forEach((movie) => {
                // console.log(movie);
                // console.log(`id# ${movie.id} - ${movie.title} - rating: ${movie.rating}`);
            });
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
                    // console.log("success", data.json());
                })
            }
        };

        $('#add-button').click((e) => {
            e.preventDefault();
            addMovie();
        });

        $('#search-button').click((e) => {
            e.preventDefault();
            let results = searchMovies();
            console.log(results);
            renderSearchResults(results)
        });

        // SEARCH MOVIE FUNCTIONALITY //
        let searchMovies = () => {
            let searchResults = [];

            getMovies().then((movies) => {
                if ($('#movie-search').val()) {
                    movies.forEach((movie) => {
                        if (movie.title.includes($('#movie-search').val())) {
                            searchResults.push(movie);
                        }
                    });
                    console.log(searchResults);
                    return searchResults;
                }
            })
        };

        let renderSearchResults = (searchResults) => {
            let htmlString = '';
            searchResults.forEach((result) => {
                htmlString += `<li class="search-result-item">${result.title}</li>`
            });
            $('.search-results-list').html(htmlString);
        };


    });


}
