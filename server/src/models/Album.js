import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },


    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }],

    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],

    coverImage: { type: String, required: true },
    releaseDate: { type: Date, default: Date.now },


    totalTracks: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },

    description: { type: String },
    backgroundColor: { type: String }
}, { timestamps: true });

const Album = mongoose.model('Album', albumSchema);
export default Album;