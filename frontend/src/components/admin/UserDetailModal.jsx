import { Modal, Tag, Tabs } from 'antd';
import {
    FaUserAstronaut, FaEnvelope, FaShieldAlt, FaCalendarAlt,
    FaMusic, FaCompactDisc, FaHeart, FaClock
} from 'react-icons/fa';

// --- CÁC COMPONENT CON VÀ HÀM TIỆN ÍCH ĐƯỢC ĐẶT Ở NGOÀI ---

// Hàm tạo màu gradient ngẫu nhiên cho banner
const getGradient = (name) => {
    const colors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-teal-400',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
};

// Component con hiển thị từng dòng thông tin
const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
        <div className="p-2 rounded-full bg-white dark:bg-gray-800 text-blue-500 shadow-sm mr-4 text-lg">
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">{label}</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);

// Tab 1: Thông tin cá nhân
// [Sửa] Nhận prop 'user'
const PersonalTab = ({ user }) => (
    <div className="grid grid-cols-1 gap-4">
        <InfoItem icon={<FaUserAstronaut />} label="Tên hiển thị" value={user.username} />
        <InfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
        <InfoItem
            icon={<FaCalendarAlt />}
            label="Ngày tham gia"
            value={new Date(user.createdAt).toLocaleDateString('vi-VN', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
        />
        <InfoItem
            icon={<FaClock />}
            label="Cập nhật lần cuối"
            value={new Date(user.updatedAt).toLocaleDateString('vi-VN')}
        />
    </div>
);

// Tab 2: Thống kê âm nhạc
// [Sửa] Nhận prop 'user'
const MusicStatsTab = ({ user }) => (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 p-4 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs opacity-80 uppercase">Playlist</p>
                        <p className="text-2xl font-bold">{user.playlists?.length || 0}</p>
                    </div>
                    <FaCompactDisc className="text-3xl opacity-50" />
                </div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs opacity-80 uppercase">Đã thích</p>
                        <p className="text-2xl font-bold">{user.likedSongs?.length || 0}</p>
                    </div>
                    <FaHeart className="text-3xl opacity-50" />
                </div>
            </div>
        </div>

        {/* Demo list nghệ sĩ yêu thích */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaMusic /> Nghệ sĩ quan tâm
            </h4>
            <div className="flex gap-2 flex-wrap">
                {user.followingArtists?.length > 0 ? (
                    user.followingArtists.map((artist, idx) => (
                        <Tag key={idx} color="blue">{artist.name}</Tag>
                    ))
                ) : (
                    <span className="text-xs text-gray-400 italic">Chưa theo dõi nghệ sĩ nào</span>
                )}
            </div>
        </div>
    </div>
);

// --- COMPONENT CHÍNH ---

const UserDetailModal = ({ open, onClose, user }) => {
    if (!user) return null;

    // Cấu hình Tabs
    const items = [
        // [Sửa] Truyền prop 'user'
        { key: '1', label: 'Thông tin chung', children: <PersonalTab user={user} /> },
        // [Sửa] Truyền prop 'user'
        { key: '2', label: 'Hồ sơ âm nhạc', children: <MusicStatsTab user={user} /> },
    ];

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={750}
            centered
            className="custom-user-detail-modal"
            modalRender={(modal) => (
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
                    {modal}
                </div>
            )}
        >
            <div className="flex flex-col md:flex-row min-h-[450px]">
                {/* CỘT TRÁI */}
                <div className="w-full md:w-2/5 relative bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
                    {/* Banner Gradient */}
                    <div className={`absolute top-0 w-full h-32 bg-gradient-to-r ${getGradient(user.username)}`}></div>

                    {/* Glassmorphism Card */}
                    <div className="relative mt-16 mx-4 mb-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 w-11/12 flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-4">
                            <img
                                src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md bg-white"
                            />
                            {/* Chấm xanh online */}
                            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{user.username}</h2>

                        {/* Badge Role */}
                        <div className="mb-4">
                            {user.isAdmin ? (
                                <Tag color="purple" className="px-3 py-1 rounded-full border-0 text-xs font-bold shadow-sm bg-purple-100 text-purple-700">
                                    ADMINISTRATOR
                                </Tag>
                            ) : (
                                <Tag color="green" className="px-3 py-1 rounded-full border-0 text-xs font-bold shadow-sm bg-green-100 text-green-700">
                                    MEMBER
                                </Tag>
                            )}
                        </div>

                        {/* ID nhỏ */}
                        <p className="text-[10px] text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            ID: {user._id}
                        </p>
                    </div>

                    {/* Trang trí thêm ở dưới */}
                    <div className="mt-auto mb-6 text-center px-6">
                        <p className="text-xs text-gray-400 italic">"Âm nhạc là cảm xúc, là cuộc sống."</p>
                    </div>
                </div>

                {/* CỘT PHẢI: NỘI DUNG CHI TIẾT */}
                <div className="w-full md:w-3/5 p-8 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaShieldAlt className="text-blue-500" /> Hồ Sơ Chi Tiết
                        </h3>
                        {/* Nút đóng giả lập */}
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                    </div>

                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
        </Modal>
    );
};

export default UserDetailModal;