module.exports = {
  getMovies: () => {
    return fetch('https://my-json-server.typicode.com/charlie-hung/movies-application/movies')
      .then(response => response.json());

  }
};
