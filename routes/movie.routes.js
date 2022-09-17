module.exports = app => {
    var router = require("express").Router();
    const movie = require('../controllers/movie.controller')


    //find all movies
    router.get('/', movie.findAllMovies);

    //find one movie by id
    router.get('/:id', movie.findOne);
    //find shows for one movie by id
    router.get('/:id/shows', movie.findShows);


    app.use('/api/movies', router);

}