/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  // console.log(movies[0]);
  movies.forEach((movie) => {
    console.log(movie);
    console.log(`id# ${movie.id} - ${movie.title} - rating: ${movie.rating}`);
  });
  $('.movie-list').html(createMovieString(movies));
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

let createMovieString = (moviesObj) => {
  let htmlString = '';

  moviesObj.forEach((movie) => {
    htmlString += `<li class="single-movie">
                <p class="movie-title">${movie.title}</p>
                <p class="movie-rating">${movie.rating}</p>
                <p class="movie-id">${movie.id}</p>
                </li>`
  });
  console.log(htmlString);
  return htmlString;
};

