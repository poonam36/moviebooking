const db = require('../models');
const Movie = db.movies;
//const movie = new Movie();
//find all the movies
module.exports.findAllMovies = (req, res) => {
  console.log(req.query);
  if (req.query.status === "PUBLISHED") {
    console.log("fetching published movies");
    Movie.find({ published: true }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Some error occured while retrieving the published movies"
      });
    })
  } else if (req.query.status === "RELEASED" && req.query.title != undefined
    && req.query.genres != undefined
    && req.query.release_date != undefined && req.query.publish_date != undefined) {
    console.log("fetching released movies with search");
    Movie.find({
      released: true,
      title: req.query.title,
      genres: req.query.genres,
      release_date: req.query.release_date,
      publish_date: req.query.publish_date
    }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Some error occured while retrieving the released movies"
      });
    })
  }
  else if (req.query.status === "RELEASED") {
    console.log("fetching released movies");
    Movie.find({ released: true }).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Some error occured while retrieving the released movies"
      });
    })
  }
  else {
    Movie.find({}).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Some error occured while retrieving the movies"
      });
    })
  }
}
//finding movies by id
module.exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findOne({ movieid: id })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movies with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};
//finding shows of movies by id
module.exports.findShows = (req, res) => {
  const id = req.params.id;

  Movie.findOne({ movieid: id })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movies with id " + id });
      else {
        res.send(data.shows);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};
