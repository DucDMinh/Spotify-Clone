import { NavLink } from 'react-router-dom';
import { FaHome, FaMusic, FaMicrophone, FaBars, FaUser, FaSignInAlt, FaKey } from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/admin', icon: FaHome, text: 'Dashboard' },
        { path: '/admin/songs', icon: FaMusic, text: 'Quản lý bài hát' },
        { path: '/admin/artists', icon: FaMicrophone, text: 'Quản lý nghệ sĩ' },
        { path: '/admin/album', icon: FaBars, text: 'Quản lý Album' },
        { path: '/admin/users', icon: FaUser, text: 'Quản lý Người dùng' },
    ];


    return (
        // dark:bg-gray-900 dark:border-gray-700
        <aside className="w-64 fixed h-full z-10 p-4 hidden lg:block bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                {/* Logo */}
                <div className="flex items-center px-4 py-6 mb-2">
                    <div className="w-8 h-8 mr-2 bg-gray-800 dark:bg-white rounded flex items-center justify-center shadow-sm">
                        <span className="text-white dark:text-gray-900 font-bold text-xs"></span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">Admin</span>
                </div>

                <hr className="border-gray-200 dark:border-gray-700 mb-4 mx-4" />

                {/* Menu */}
                <nav>
                    {menuItems.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                    ))}

                </nav>
            </div>
        </aside>
    );
};

// Component con SidebarItem
// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ path, icon: Icon, text }) => (
    <NavLink
        to={path}
        end={path === '/admin'}
        className={({ isActive }) => `flex items-center px-4 py-3 mx-2 mb-1 rounded-xl cursor-pointer transition-all duration-200 
      ${isActive
                ? 'bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-white font-semibold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`
        }
    >
        {({ isActive }) => (
            <>
                <div className={`p-2 rounded-lg mr-3 shadow-sm flex items-center justify-center transition-colors
          ${isActive
                        ? 'bg-gradient-to-tl from-purple-700 to-pink-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'}`}>
                    <Icon size={14} />
                </div>
                <span className="text-sm">{text}</span>
            </>
        )}
    </NavLink>
);

export default Sidebar;