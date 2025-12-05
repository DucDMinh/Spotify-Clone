import mongoose, { Schema, Types } from "mongoose";

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    }],
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    musician: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    plays: {
        type: Number,
        default: 0
    },
    coverImage: {
        type: String,
        required: true
    },
    audioFile: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Song = mongoose.model('Song', songSchema);

export default Song;