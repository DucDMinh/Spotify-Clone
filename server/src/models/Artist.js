import mongoose, { Schema } from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: false
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }]
}, { timestamps: true })
const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
