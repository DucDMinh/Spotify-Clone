import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String, default: "" }, // Nếu rỗng sẽ lấy ảnh bài đầu tiên

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],


    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    isPublic: { type: Boolean, default: true },

    totalDuration: { type: Number, default: 0 }
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;