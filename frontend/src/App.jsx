import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout'; // Layout của Client
import AdminLayout from './layouts/AdminLayout';  // Layout của Admin mới
import HomePage from './pages/client/HomePage';
import AdminHome from './pages/admin/AdminHome';
import useThemeStore from './stores/useThemeStore';
import UsersPage from './pages/admin/UsersPage';
import { useEffect } from 'react';

function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    initTheme(); // Gọi hàm này 1 lần khi App mount
  }, []);
  return (
    <Routes>
      {/* Route cho User (Nghe nhạc) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Route cho Admin (Dashboard) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  )
}

export default App;