import { useState } from 'react';
import {
    FaTrash, FaEdit, FaPlay, FaPause, FaMusic, FaHeadphones, FaClock, FaPlus, FaSearch
} from 'react-icons/fa';
import { Popconfirm, Tooltip } from 'antd';
// import { useSongs } from '../../hooks/useSongs'; // Giả sử bạn sẽ tạo hook này sau
// import CreateSongModal from './CreateSongModal'; // Modal tạo mới


const MOCK_SONGS = [
    {
        _id: '1',
        title: 'Chúng Ta Của Tương Lai',
        artist: [{ name: 'Sơn Tùng M-TP' }],
        album: { title: 'Sky Tour' },
        category: [{ name: 'Pop' }, { name: 'Ballad' }],
        coverImage: 'https://i.scdn.co/image/ab67616d0000b273c9db6d8cb248679198642738',
        duration: 245,
        plays: 1504200,
        createdAt: '2024-03-08'
    },
    {
        _id: '2',
        title: 'Making My Way',
        artist: [{ name: 'Sơn Tùng M-TP' }],
        category: [{ name: 'Edm' }],
        coverImage: 'https://i.scdn.co/image/ab67616d0000b2730635e40e698886b6a4a15a81',
        duration: 180,
        plays: 980000,
        createdAt: '2024-01-20'
    }
];

const SongsPage = () => {
    // const { songs, loading, deleteSong } = useSongs(); // Hook thực tế
    const songs = MOCK_SONGS; // Dùng tạm mock data

    const [playingId, setPlayingId] = useState(null); // Quản lý bài nào đang phát preview
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm format giây sang phút:giây (VD: 205 -> 03:25)
    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    // Format số lượt nghe (VD: 1500 -> 1.5K)
    const formatPlays = (num) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
    };

    const togglePlay = (id) => {
        if (playingId === id) {
            setPlayingId(null); // Pause
        } else {
            setPlayingId(id); // Play
        }
    };

    return (
        <div className="flex flex-col gap-6 min-h-screen text-gray-800 dark:text-gray-200">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Thư viện bài hát
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Quản lý kho nhạc, nghệ sĩ và thống kê lượt nghe.
                    </p>
                </div>

                <div className="flex gap-3">
                    {/* Search Bar */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Tìm bài hát, nghệ sĩ..."
                            className="pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    </div>

                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105 active:scale-95">
                        <FaPlus /> <span className="hidden sm:inline">Tải lên</span>
                    </button>
                </div>
            </div>

            {/* --- STATS CARDS (Optional) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-bold">Tổng bài hát</p>
                        <h3 className="text-2xl font-bold">{songs.length}</h3>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                        <FaMusic size={20} />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border-l-4 border-pink-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-bold">Tổng lượt nghe</p>
                        <h3 className="text-2xl font-bold">{formatPlays(songs.reduce((acc, curr) => acc + curr.plays, 0))}</h3>
                    </div>
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400">
                        <FaHeadphones size={20} />
                    </div>
                </div>
                {/* Thêm card khác nếu muốn */}
            </div>

            {/* --- SONG LIST (CUSTOM LAYOUT) --- */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-none transition-colors duration-300">

                {/* Header Row (Giả lập bảng nhưng dùng Grid) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <div className="col-span-5">Bài hát / Nghệ sĩ</div>
                    <div className="col-span-2 text-center">Thể loại</div>
                    <div className="col-span-2 text-center">Thống kê</div>
                    <div className="col-span-1 text-center">Thời gian</div>
                    <div className="col-span-2 text-right pr-4">Hành động</div>
                </div>

                <div className="flex flex-col gap-3">
                    {songs.map((song) => (
                        <div
                            key={song._id}
                            className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-750/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all duration-300"
                        >
                            {/* 1. Image & Title */}
                            <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <img
                                        src={song.coverImage}
                                        alt={song.title}
                                        className={`w-full h-full object-cover rounded-xl shadow-md transition-all duration-500 ${playingId === song._id ? 'animate-pulse ring-2 ring-purple-500' : ''}`}
                                    />
                                    {/* Play Overlay Button */}
                                    <button
                                        onClick={() => togglePlay(song._id)}
                                        className={`absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${playingId === song._id ? 'opacity-100' : ''}`}
                                    >
                                        {playingId === song._id ? <FaPause /> : <FaPlay className="ml-1" />}
                                    </button>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-gray-900 dark:text-white truncate text-base mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {song.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        {song.artist.map((a, idx) => (
                                            <span key={idx} className="hover:underline cursor-pointer">{a.name}{idx < song.artist.length - 1 && ', '}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 2. Categories (Badges) */}
                            <div className="col-span-6 md:col-span-2 flex flex-wrap justify-center gap-2">
                                {song.category?.map((cat, idx) => (
                                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                        {cat.name}
                                    </span>
                                ))}
                            </div>

                            {/* 3. Stats (Plays) */}
                            <div className="col-span-6 md:col-span-2 text-center">
                                <Tooltip title={`${song.plays.toLocaleString()} lượt nghe`}>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 text-xs font-bold">
                                        <FaHeadphones size={10} />
                                        {formatPlays(song.plays)}
                                    </div>
                                </Tooltip>
                            </div>

                            {/* 4. Duration */}
                            <div className="hidden md:block col-span-1 text-center text-sm font-medium text-gray-500">
                                {formatDuration(song.duration)}
                            </div>

                            {/* 5. Actions */}
                            <div className="col-span-12 md:col-span-2 flex justify-end gap-2 items-center md:pr-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Tooltip title="Chỉnh sửa">
                                    <button className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                                        <FaEdit size={16} />
                                    </button>
                                </Tooltip>

                                <Popconfirm
                                    title="Xóa bài hát"
                                    description="Hành động này không thể hoàn tác?"
                                    okText="Xóa ngay"
                                    cancelText="Hủy"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Tooltip title="Xóa">
                                        <button className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors">
                                            <FaTrash size={16} />
                                        </button>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {songs.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            <FaMusic className="mx-auto text-4xl mb-3 opacity-30" />
                            <p>Chưa có bài hát nào được tải lên.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SongsPage;