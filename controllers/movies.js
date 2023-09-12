module.exports.getAllMovies = (req, res) => {
  res.send({ message: 'allMovies' });
};
module.exports.createMovie = (req, res) => {
  res.send({ message: 'movie created' });
};
module.exports.deleteMovie = (req, res) => {
  res.send({ message: 'movie deleted' });
};
