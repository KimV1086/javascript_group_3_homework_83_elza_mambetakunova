const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String, required: true
    },
    release: {
        type: String, required: true
    },
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    }
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;