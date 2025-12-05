import mongoose, { Schema } from "mongoose";

const playListsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    privacy: {
        type: String,
        enum: ['public', 'private', 'non-public'],
        default: 'private'
    }
}, { timestamps: true })

const Playlist = mongoose.model('Playlist', playListsSchema);
export default Playlist;