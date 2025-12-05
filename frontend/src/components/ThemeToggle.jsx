import { FaSun, FaMoon } from 'react-icons/fa';
import useThemeStore from '../stores/useThemeStore';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 transition-all shadow-sm hover:shadow-md"
            title="Toggle Theme"
        >
            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>
    );
};

export default ThemeToggle;