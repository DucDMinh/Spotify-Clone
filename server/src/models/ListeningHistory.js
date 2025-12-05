import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },

    // Ngữ cảnh: User nghe bài này từ đâu?
    context: {
        type: String,
        enum: ['playlist', 'album', 'search', 'artist', 'liked'],
        default: 'search'
    },

    playedAt: { type: Date, default: Date.now }
});

// Quan trọng: Tạo Index để truy vấn lịch sử nhanh nhất, tự động xóa sau 30 ngày (optional)
historySchema.index({ user: 1, playedAt: -1 });

const ListeningHistory = mongoose.model('ListeningHistory', historySchema);
export default ListeningHistory;