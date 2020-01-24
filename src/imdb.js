const $ = require('jquery');
import movieKey from './keys.js';

const getPoster = (searchString) => {
  return getImdbMovie(searchString).then((movie) => {
    console.log(movie.poster);
    return movie.poster;
  });
};

const getImdbMovie = (searchString) => {
  let searchQuery = searchString.split(' ').join('%2520');
  // console.log(searchQuery);

  return fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${searchQuery}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
      "x-rapidapi-key": movieKey
    }
  })
    .then(response => {
      // console.log(response.json());
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  getImdbMovie,
  getPoster
};