import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/client/HomePage';
import Dashboard from './pages/admin/Dashboard';
import useThemeStore from './stores/useThemeStore';
import UsersPage from './pages/admin/UsersPage';
import { useEffect } from 'react';

function App() {
  const initTheme = useThemeStore((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Route cho Admin (Dashboard) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  )
}

export default App;