import { createUser, getAllUsers, deleteUser, updateUser } from "../../services/userService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/User.js";
import { uploadToCloudinary } from "../../services/uploadService.js";
import sharp from 'sharp';

const CreateNewUser = async (req, res, next) => {
    try {
        const avatarFile = req.files && req.files['avatar'] ? req.files['avatar'][0] : null;
        let avatarUrl = "https://res.cloudinary.com/dnhm50qe9/image/upload/v1765042020/OIP_fdrjau.webp";

        // 2. Chỉ xử lý nếu có file
        if (avatarFile) {
            try {
                const compressedBuffer = await sharp(avatarFile.buffer)
                    .resize(500, 500, { // Resize về kích thước 500x500
                        fit: 'cover',   // Cắt ảnh cho vừa khung, không bị méo
                        position: 'center' // Lấy trung tâm ảnh
                    })
                    .toFormat('jpeg')   // Chuyển về định dạng JPEG cho nhẹ
                    .jpeg({ quality: 80 }) // Nén chất lượng xuống 80%
                    .toBuffer();        // Chuyển lại thành Buffer để gửi đi upload
                // Gửi buffer đã nén lên Cloudinary
                const avatarResult = await uploadToCloudinary(compressedBuffer, 'spotify-clone/avatar', 'image');
                avatarUrl = avatarResult.secure_url;

            } catch (uploadError) {
                console.error("Lỗi upload ảnh:", uploadError);
                // Nếu lỗi upload ảnh, vẫn cho tạo user nhưng dùng ảnh mặc định
            }
        }

        const userData = {
            ...req.body,
            avatar: avatarUrl,
        };

        const user = await createUser(userData);
        if (!user) {
            return res.status(400).json({ message: 'User creation failed' });
        }
        res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user: ' + error.message });
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users: ' + error.message });
    }
}

const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await deleteUser(userId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user: ' + error.message });
    }
}

const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await updateUser(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user: ' + error.message });
    }
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in: ' + error.message })
    };
}

export { CreateNewUser, GetAllUsers, DeleteUser, UpdateUser, Login };