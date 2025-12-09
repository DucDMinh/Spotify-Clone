import { FaSearch, FaUser, FaCog, FaBell } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

// eslint-disable-next-line no-unused-vars
const Header = ({ title = "Dashboard" }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-transparent">
            <div className="mb-4 md:mb-0 w-full md:w-auto">
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <ThemeToggle />
                <FaCog size={16} className="text-gray-500 cursor-pointer hover:text-purple-600" />
                <FaBell size={16} className="text-gray-500 cursor-pointer hover:text-purple-600" />
            </div>
        </header>
    );
};

export default Header;