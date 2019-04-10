const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.album) {
        Track.find({album: req.query.album})
            .then(result => {
                if (result) return res.send(result);
                res.sendStatus(404)
            })
            .catch(() => res.sendStatus(500));
    } else {
        Track.find()
            .then(tracks => {
                res.send(tracks)
            }).catch(() => res.sendStatus(500))
    }
});

module.exports = router;