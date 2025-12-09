import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaUserCircle, FaEye, FaPlus } from 'react-icons/fa';
import { Popconfirm, Modal, Form, Input, Select, message, Button, notification } from 'antd';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Instance để quản lý form

    // 3. Hàm xử lý khi nhấn nút "Lưu" trong Modal
    const handleCreateUser = async (values) => {
        try {
            // values chứa: { username, email, password, role, ... }
            const res = await axios.post('/api/users', values);

            if (res.data) {
                notification.success({
                    message: "Create User",
                    description: "User create successfully!"
                });
                setIsModalOpen(false); // Đóng modal
                form.resetFields(); // Reset form trắng
                fetchUsers(); // Load lại danh sách user mới
            }
        } catch (error) {
            console.error(error);
            message.error("Thêm thất bại!");
        }
    };

    // 2. Hàm xóa User
    const handleDelete = async (userId) => {
        console.log("Check id:", userId)
        try {

            await axios.delete(`/api/users/${userId}`);

            // Cập nhật lại giao diện sau khi xóa thành công
            setUsers(users.filter(user => user._id !== userId));
            notification.success({
                message: "Delete User",
                description: "User deleted successfully!"
            });
        } catch (err) {
            console.error(err);
            notification.error({
                message: "Delete User False",
                description: "User deleted false!"
            });
        }
    };

    const cancel = e => {
        console.log(e);
        message.error('Click on No');
    };


    const fetchUsers = useCallback(async () => {
        setLoading(true); // Nên set loading true mỗi khi gọi lại
        try {
            const response = await axios.get('/api/users');

            if (response.data && response.data.data) {
                setUsers(response.data.data);
                const sortedData = response.data.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setUsers(sortedData);
            }
            setLoading(false);
        } catch (err) {
            console.error("Lỗi tải users:", err);
            setError("Không thể tải danh sách người dùng.");
        } finally {
            setLoading(false);
        }
    }, []); // Mảng rỗng nghĩa là hàm này không phụ thuộc biến nào bên ngoài, chỉ tạo 1 lần

    // 2. useEffect chỉ cần gọi hàm này
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Thêm fetchUsers vào dependency

    if (loading) return <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (

        <div className="flex flex-col gap-6">
            {/* === 1. Nút Thêm mới (Đưa ra ngoài Card) === */}
            <div className="flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-md"
                >
                    <FaPlus /> Thêm mới
                </button>
                <Modal
                    title="Thêm Người Dùng Mới"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null} // Ẩn footer mặc định để dùng nút trong Form
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateUser}
                        className="mt-4"
                    >
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                        >
                            <Input placeholder="Nhập tên người dùng" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input placeholder="example@gmail.com" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="isAdmin"
                            initialValue={false}
                        >
                            <Select>
                                <Select.Option value={false}>Member</Select.Option>
                                <Select.Option value={true}>Admin</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item className="mb-0 flex justify-end">
                            <div className="flex justify-end gap-2">
                                <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                                <Button type="primary" htmlType="submit" className="bg-blue-600">
                                    Tạo mới
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            {/* Header của bảng */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h6 className="font-bold text-gray-800 dark:text-white text-lg">Danh sách người dùng</h6>

                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Tổng cộng: <b className="text-gray-800 dark:text-white">{users.length}</b> thành viên
                    </span>
                </div>

                {/* Bảng Dữ liệu */}
                <div className="overflow-x-auto">
                    <table className="w-full align-middle">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Thành viên
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Vai trò
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Ngày tham gia
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    {/* Cột 1: Avatar + Tên + Email */}
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.avatar ? (
                                                    <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={user.avatar} alt="" />
                                                ) : (
                                                    <FaUserCircle className="h-10 w-10 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                    {user.username}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Cột 2: Vai trò (Admin/User) */}
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {user.isAdmin ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Member
                                            </span>
                                        )}
                                    </td>

                                    {/* Cột 3: Ngày tham gia */}
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                    </td>

                                    {/* Cột 4: Nút Xóa/Sửa */}
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            onClick={() => {
                                                alert(`Xem chi tiết user: ${user.username}`);
                                                // Hoặc điều hướng: navigate(`/admin/users/${user._id}`)
                                            }}
                                            className="text-white hover:text-blue-900 bg-green-400 dark:bg-black dark:text-green-600 dark:hover:text-blue-300 mx-2"
                                            title="Xem chi tiết"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            className="text-blue-600 hover:text-blue-900 bg-yellow-400 dark:bg-black dark:text-blue-400 dark:hover:text-blue-300 mx-2"
                                            title="Sửa (Chưa làm)"
                                        >
                                            <FaEdit />
                                        </button>
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this user?"
                                            // TRUYỀN THẲNG HÀM VÀO ĐÂY, KHÔNG CẦN GỌI HÀM confirm RIÊNG LẺ
                                            onConfirm={() => handleDelete(user._id)}

                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            {/* Bỏ onClick và setDataDelete ở đây đi, không cần thiết nữa */}
                                            <button className="text-red-600 hover:text-red-900 mx-2">
                                                <FaTrash style={{ cursor: "pointer" }} />
                                            </button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;