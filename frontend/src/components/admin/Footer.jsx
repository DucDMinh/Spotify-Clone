const Footer = () => {
    return (
        <footer className="mt-8 py-4 text-gray-400 dark:text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center transition-colors">
            <p>© {new Date().getFullYear()}, made with ❤️ by Creative Tim for a better web.</p>
            <ul className="flex gap-4 mt-2 md:mt-0">
                <li className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">Creative Tim</li>
                <li className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">Blog</li>
            </ul>
        </footer>
    );
};

export default Footer;