import { Link } from 'react-router-dom'
import { FaHome, FaSearch, FaBook } from 'react-icons/fa' // Import icon
import '../App.css' // Dùng chung CSS tạm thời

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>🎧 BeatHub</h2>
            </div>

            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/" className="menu-item">
                            <FaHome className="icon" /> Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="menu-item">
                            <FaSearch className="icon" /> Tìm kiếm
                        </Link>
                    </li>
                    <li>
                        <Link to="/library" className="menu-item">
                            <FaBook className="icon" /> Thư viện
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar