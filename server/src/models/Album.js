import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },

    // Nghệ sĩ chính của Album
    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }],

    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],

    coverImage: { type: String, required: true },
    releaseDate: { type: Date, default: Date.now },

    // Metadata album
    totalTracks: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 }, // Tổng thời lượng (giây)

    description: { type: String },
    backgroundColor: { type: String } // Màu chủ đạo (hex) khi vào trang album
}, { timestamps: true });

const Album = mongoose.model('Album', albumSchema);
export default Album;