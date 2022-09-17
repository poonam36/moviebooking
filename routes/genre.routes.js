module.exports = app => {
    var router = require("express").Router();
    const genre = require('../controllers/genre.controller')

    //find all genres
    router.get('/genres', genre.findAllGenres);
    app.use('/api', router);
}