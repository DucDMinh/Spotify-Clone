import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import PlayerBar from './PlayerBar' // <-- Import mới

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content">
                <Outlet />
            </div>

            {/* Component Player Bar Global */}
            <PlayerBar />
        </div>
    )
}

export default MainLayout