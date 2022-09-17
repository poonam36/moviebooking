const db = require('../models');
const Artist = db.artists;

module.exports.findAllArtists = (req, res) => {
    Artist.find({}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured while retrieving the artist"
        });
    })
}
