import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 1. Middleware kiểm tra đăng nhập (User bình thường)
const protect = async (req, res, next) => {
    let token;

    // Kiểm tra xem header có gửi kèm token không (Dạng: Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Lấy token từ chuỗi "Bearer <token>"
            token = req.headers.authorization.split(" ")[1];

            // Giải mã token để lấy ID user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tìm user trong DB và gán vào biến req.user (trừ trường password)
            req.user = await User.findById(decoded.id).select("-password");

            next(); // Cho phép đi tiếp
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Token không hợp lệ, vui lòng đăng nhập lại" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Bạn chưa được cấp quyền, không tìm thấy token" });
    }
};

// 2. Middleware kiểm tra Admin (Chỉ Admin mới được làm)
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Đúng là Admin, cho qua
    } else {
        res.status(403).json({ message: "Chỉ Admin mới có quyền thực hiện việc này" });
    }
};

export { protect, admin };