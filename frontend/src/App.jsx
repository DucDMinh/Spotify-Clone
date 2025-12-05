import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout' // <-- Import
import HomePage from './pages/client/HomePage'

function App() {
  return (
    <Routes>
      {/* Route cha: Dùng MainLayout */}
      <Route path="/" element={<MainLayout />}>

        {/* Route con: Sẽ hiện vào chỗ <Outlet /> của cha */}
        <Route index element={<HomePage />} />

        {/* Ví dụ sau này thêm trang Search */}
        {/* <Route path="search" element={<SearchPage />} /> */}

      </Route>
    </Routes>
  )
}

export default App