import { NavLink } from 'react-router-dom';
import { FaHome, FaTable, FaCreditCard, FaCube, FaGlobe, FaUser, FaSignInAlt, FaKey } from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/admin', icon: FaHome, text: 'Dashboard' },
        { path: '/admin/tables', icon: FaTable, text: 'Tables' },
        { path: '/admin/billing', icon: FaCreditCard, text: 'Billing' },
        { path: '/admin/vr', icon: FaCube, text: 'Virtual Reality' },
        { path: '/admin/rtl', icon: FaGlobe, text: 'RTL' },
    ];

    const accountItems = [
        { path: '/admin/profile', icon: FaUser, text: 'Profile' },
        { path: '/signin', icon: FaSignInAlt, text: 'Sign In' },
        { path: '/signup', icon: FaKey, text: 'Sign Up' },
    ];

    return (
        // dark:bg-gray-900 dark:border-gray-700
        <aside className="w-64 fixed h-full z-10 p-4 hidden lg:block bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                {/* Logo */}
                <div className="flex items-center px-4 py-6 mb-2">
                    <div className="w-8 h-8 mr-2 bg-gray-800 dark:bg-white rounded flex items-center justify-center shadow-sm">
                        <span className="text-white dark:text-gray-900 font-bold text-xs">S</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">Soft UI Dashboard</span>
                </div>

                <hr className="border-gray-200 dark:border-gray-700 mb-4 mx-4" />

                {/* Menu */}
                <nav>
                    {menuItems.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                    ))}

                    <h6 className="uppercase text-xs font-bold text-gray-400 dark:text-gray-500 px-6 mt-6 mb-2">Account Pages</h6>

                    {accountItems.map((item, index) => (
                        <SidebarItem key={index} {...item} />
                    ))}
                </nav>
            </div>
        </aside>
    );
};

// Component con SidebarItem
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