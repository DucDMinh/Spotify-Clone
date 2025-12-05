import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { createRequire } from "module"; // 1. Import hàm tạo require

const require = createRequire(import.meta.url); // 2. Tạo hàm require tương thích
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // 3. Import chính xác Class

dotenv.config();

// Kiểm tra xem đã import được chưa (Nếu log ra 'undefined' là lỗi, nếu ra [Class: CloudinaryStorage] là ok)
console.log("Check CloudinaryStorage Import:", CloudinaryStorage);

// Config Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Config Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Tự động nhận diện file nhạc
        if (file.mimetype.startsWith('audio')) {
            return {
                folder: 'spotify-clone/songs',
                resource_type: 'auto',
                allowed_formats: ['mp3', 'wav'],
            };
        }
        // Tự động nhận diện file ảnh
        else {
            return {
                folder: 'spotify-clone/images',
                resource_type: 'image',
                allowed_formats: ['jpg', 'png', 'jpeg'],
            };
        }
    },
});

const upload = multer({ storage: storage });

export default upload;