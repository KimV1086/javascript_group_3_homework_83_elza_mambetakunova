const express = require('express');

const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistory = require('./app/trackHistory');

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const config = require('./config');

const port = 8000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());


mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/artists', artists);
    app.use('/albums', albums);
    app.use('/tracks', tracks);
    app.use('/users', users);
    app.use('/track_history', trackHistory);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});