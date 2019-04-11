const express = require('express');

const User = require('../models/User');
const History = require('../models/TrackHistory');
const Track = require('../models/Track');


const router = express.Router();


router.post('/', async (req, res) => {
    const token = req.get("Token");

    if (!token) {
        return res.status(401).send({error: 'Token headers not present'})
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Token incorrect'})
    }

    const track = await Track.findOne({});

    if (!track) {
        return res.status(401).send({error: 'Track not found'})
    }

    const trackHistory  = {
        user: user._id,
        track: req.body.track,
        datetime: new Date().toISOString()
    };
        const history = new History(trackHistory);
         history.save(trackHistory)
             .then((result) => res.send(result))
             .catch(e => res.status(500).send(e))
});


module.exports = router;