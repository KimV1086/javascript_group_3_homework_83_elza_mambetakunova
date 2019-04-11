const express = require('express');

const User = require('../models/User');
const History = require('../models/TrackHistory');
const Track = require('../models/Track');


const router = express.Router();

router.get('/', (req, res) => {
    History.find()
        .then(artists => res.send(artists))
        .catch(() => res.sendStatus(500))
});


router.post('/', async (req, res) => {
    try {
        const token = req.get("Token");

        if (!token) {
            return res.status(401).send({error: 'Token headers not present'})
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.status(401).send({error: 'Token incorrect'})
        }

        const track = await Track.findById(req.body.track);

        if (!track) {
            return res.status(401).send({error: 'Track not found'})
        }

        const trackHistory  = {
            user: user._id,
            track: req.body.track,
            datetime: new Date().toISOString()
        };
        const history = new History(trackHistory);
        await history.save();

        res.send(history)

    } catch (e) {
        res.send({message: 'Error happened'})
    }
});


module.exports = router;