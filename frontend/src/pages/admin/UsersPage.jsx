import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaUserCircle } from 'react-icons/fa';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Hàm gọi API lấy danh sách User
    const fetchUsers = async () => {
        try {
            // // Lưu ý: Nếu backend yêu cầu token, bạn cần thêm header Authorization
            // const token = localStorage.getItem('token');
            // const config = {
            //     headers: { Authorization: `Bearer ${token}` }
            // };

            const response = await axios.get('/api/users');

            // Backend trả về: { data: [...] }
            if (response.data && response.data.data) {
                setUsers(response.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error("Lỗi tải users:", err);
            setError("Không thể tải danh sách người dùng.");
            setLoading(false);
        }
    };

    // 2. Hàm xóa User
    const handleDelete = async (userId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/users/${userId}`);

            // Cập nhật lại giao diện sau khi xóa thành công
            setUsers(users.filter(user => user._id !== userId));
            alert("Đã xóa người dùng thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi xóa người dùng.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="flex flex-col gap-6">
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
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mx-2"
                                            title="Sửa (Chưa làm)"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mx-2"
                                            title="Xóa người dùng"
                                        >
                                            <FaTrash />
                                        </button>
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