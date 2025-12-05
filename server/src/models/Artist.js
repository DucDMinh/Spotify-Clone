import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    bio: { type: String },
    avatar: { type: String }, // Ảnh đại diện nghệ sĩ

    // Danh sách bài hát và album
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],

    // Người hâm mộ
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Tổng số lượt nghe của tất cả bài hát (Update định kỳ)
    totalStreams: { type: Number, default: 0 }
}, { timestamps: true });

// Index tên để tìm kiếm
artistSchema.index({ name: 'text' });

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;