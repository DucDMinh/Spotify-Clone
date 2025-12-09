import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { notification, message } from 'antd';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading cho bảng danh sách
    const [actionLoading, setActionLoading] = useState(false); // Loading cho Modal (Thêm/Xóa)
    const [error, setError] = useState(null);

    // 1. Hàm lấy danh sách user (Bọc useCallback để tránh lỗi render vô tận)
    const fetchUsers = useCallback(async () => {
        try {
            const data = await userService.getAll();
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
        setActionLoading(true);
        try {
            await userService.create(values);
            notification.success({ message: "Tạo người dùng thành công!" });
            fetchUsers();
            return true;
        } catch (error) {
            console.error(error);
            message.error("Thêm thất bại!");
            return false;
        } finally {
            setActionLoading(false);
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
    const editUser = async (id, values) => {
        setActionLoading(true);
        try {
            await userService.update(id, values);
            notification.success({ message: "Cập nhật thành công!" });
            fetchUsers(); // Load lại danh sách
            return true;
        } catch (error) {
            console.error(error);
            message.error("Cập nhật thất bại!");
            return false;
        } finally {
            setActionLoading(false);
        }
    };

    // Tự động chạy khi component load lần đầu
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, btnLoading: actionLoading, error, addUser, removeUser, editUser };
};