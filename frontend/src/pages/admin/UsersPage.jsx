import { useState } from 'react';
import { FaTrash, FaEdit, FaUserCircle, FaEye, FaPlus } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import { useUsers } from '../../hooks/useUsers';
import CreateUserModal from '../../components/admin/CreateUserModal';

const UsersPage = () => {
    // 1. Gọi Hook: Lấy dữ liệu và các hàm xử lý
    const { users, loading, btnLoading, addUser, removeUser, error } = useUsers();

    // 2. State quản lý đóng mở Modal (UI State)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCreateSubmit = async (values) => {
        const success = await addUser(values);
        if (success) {
            setIsModalOpen(false); // Chỉ đóng modal khi thêm thành công
        }
    };

    if (loading) return <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="flex flex-col gap-6">

            <div className="flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h6 className="font-bold text-gray-800 dark:text-white text-lg">Danh sách người dùng</h6>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Tổng cộng: <b className="text-gray-800 dark:text-white">{users.length}</b> thành viên
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full align-middle">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thành viên</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Vai trò</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ngày tham gia</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
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
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{user.username}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {user.isAdmin ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Member</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button className="text-white hover:text-blue-900 bg-green-400 dark:bg-black dark:text-green-600 dark:hover:text-blue-300 mx-2 p-2 rounded">
                                            <FaEye />
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-900 bg-yellow-400 dark:bg-black dark:text-blue-400 dark:hover:text-blue-300 mx-2 p-2 rounded">
                                            <FaEdit />
                                        </button>

                                        {/* Nút xóa gọi hàm removeUser từ Hook */}
                                        <Popconfirm
                                            title="Delete user"
                                            description="Are you sure?"
                                            onConfirm={() => removeUser(user._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className="text-white bg-red-400 hover:text-red-900 dark:bg-black dark:text-red-400 dark:hover:text-red-300 p-2 rounded mx-2">
                                                <FaTrash />
                                            </button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateUserModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateSubmit}
                loading={btnLoading} // Truyền trạng thái loading vào để nút bị disable khi đang lưu
            />
        </div>
    );
};

export default UsersPage;