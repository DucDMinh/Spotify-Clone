import { FaSearch, FaUser, FaCog, FaBell } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

const Header = ({ title = "Dashboard" }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-transparent">
            <div className="mb-4 md:mb-0 w-full md:w-auto">
                <nav className="text-sm text-gray-500 mb-1">
                    <span className="opacity-50">Pages</span> / <span className="text-gray-800">{title}</span>
                </nav>
                <h6 className="font-bold text-gray-800">{title}</h6>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <ThemeToggle />
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400"><FaSearch size={14} /></span>
                    <input
                        type="text"
                        placeholder="Type here..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-48 bg-white"
                    />
                </div>
                <button className="text-gray-500 font-bold text-sm flex items-center gap-1 hover:text-purple-600">
                    <FaUser size={14} /> <span className="hidden sm:inline">Sign In</span>
                </button>
                <FaCog size={16} className="text-gray-500 cursor-pointer hover:text-purple-600" />
                <FaBell size={16} className="text-gray-500 cursor-pointer hover:text-purple-600" />
            </div>
        </header>
    );
};

export default Header;