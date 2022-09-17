module.exports = app => {
    var router = require("express").Router();
    const artist = require('../controllers/artist.controller')

    //find all artists
    router.get('/artists', artist.findAllArtists);

    app.use('/api', router);



};