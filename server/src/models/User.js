import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    likeSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre('save', async function () { // 1. Xóa chữ 'next' trong ngoặc này đi
    // Nếu password không đổi thì return luôn (tương đương return next())
    if (!this.isModified('password')) {
        return;
    }

    try {
        // 2. Hash password bình thường
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // 3. KHÔNG CẦN gọi next() ở cuối nữa, hàm kết thúc là tự xong.
    } catch (error) {
        throw new Error(error); // Nếu lỗi, chỉ cần throw để Mongoose tự bắt
    }
});

const User = mongoose.model('User', userSchema);
export default User;
