import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { notification, message } from 'antd';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Hàm lấy danh sách user (Bọc useCallback để tránh lỗi render vô tận)
    const fetchUsers = useCallback(async () => {
        // --- SỬA ĐOẠN NÀY ---
        // Không set loading(true) ở đây nữa, vì mặc định nó đã true rồi.
        // Hoặc chỉ set nếu nó đang false
        // setLoading(true); 

        try {
            const data = await userService.getAll();
            // ... logic sắp xếp giữ nguyên
            const sortedData = data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setUsers(sortedData);
        } catch (err) {
            console.error("Lỗi tải users:", err);
            setError("Không thể tải danh sách người dùng.");
        } finally {
            setLoading(false); // Chỉ set false khi xong việc
        }
    }, []);
    // 2. Hàm Thêm User
    const addUser = async (values) => {
        try {
            await userService.create(values);
            notification.success({
                message: "Create User",
                description: "User created successfully!"
            });
            fetchUsers(); // Load lại dữ liệu ngay lập tức
            return true; // Trả về true để báo cho UI đóng Modal
        } catch (error) {
            console.error(error);
            message.error("Thêm thất bại! Vui lòng kiểm tra lại.");
            return false;
        }
    };

    // 3. Hàm Xóa User
    const removeUser = async (userId) => {
        try {
            await userService.delete(userId);

            // Cập nhật UI ngay lập tức (Optimistic update)
            setUsers(prev => prev.filter(user => user._id !== userId));

            notification.success({
                message: "Delete User",
                description: "User deleted successfully!"
            });
        } catch (err) {
            console.error(err);
            notification.error({
                message: "Delete User Failed",
                description: "Could not delete user."
            });
        }
    };

    // Tự động chạy khi component load lần đầu
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, error, addUser, removeUser };
};