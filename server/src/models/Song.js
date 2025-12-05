import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },

    // Một bài hát có thể có nhiều nghệ sĩ (feat.)
    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }],

    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },

    // Liên kết với danh mục (Mood, Pop, v.v.)
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],

    audioFile: { type: String, required: true }, // URL Cloudinary
    audioPublicId: { type: String }, // Public ID để xóa file sau này

    coverImage: { type: String, required: true },

    duration: { type: Number, required: true }, // Tính bằng giây (VD: 205)
    lyrics: { type: String }, // Lời bài hát (Optional)

    plays: { type: Number, default: 0 } // Số lượt nghe
}, { timestamps: true });

// Index text để phục vụ chức năng tìm kiếm nhanh
songSchema.index({ title: 'text' });

const Song = mongoose.model('Song', songSchema);
export default Song;