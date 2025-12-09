
import { create } from 'zustand'

const useThemeStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'light', // Mặc định lấy từ local hoặc là 'light'

    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';

        // Lưu vào localStorage
        localStorage.setItem('theme', newTheme);

        // Thêm/Xóa class 'dark' vào thẻ <html> (root)
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        return { theme: newTheme };
    }),

    // Hàm khởi tạo để set class đúng khi vừa load trang
    initTheme: () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}))

export default useThemeStore;