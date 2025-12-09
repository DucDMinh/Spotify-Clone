import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    bio: { type: String },
    avatar: { type: String },


    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],


    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],


    totalStreams: { type: Number, default: 0 }
}, { timestamps: true });


artistSchema.index({ name: 'text' });

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;