import mongoose, { Schema } from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    }],
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    plays: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
const Album = mongoose.model('Album', albumSchema);
export default Album;