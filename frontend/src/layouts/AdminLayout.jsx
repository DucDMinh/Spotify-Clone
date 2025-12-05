import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import Footer from '../components/admin/Footer';

const AdminLayout = () => {
    return (
        // Thêm dark:bg-gray-900 dark:text-white
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans flex text-gray-800 dark:text-white transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-6 transition-all duration-300 flex flex-col min-h-screen">
                <Header />
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default AdminLayout;