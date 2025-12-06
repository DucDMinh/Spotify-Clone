import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- THAY ĐỔI QUAN TRỌNG NHẤT ---
// Dùng memoryStorage để lấy được Buffer (dữ liệu thô) của file
// giúp tính toán duration và upload thủ công trong Controller
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;