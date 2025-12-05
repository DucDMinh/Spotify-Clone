import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomePage from './pages/client/HomePage'

// Import Icons từ react-icons (Đã có trong package.json)
import {
  FaHome, FaTable, FaCreditCard, FaCube, FaGlobe, FaUser, FaSignInAlt, FaKey,
  FaSearch, FaBell, FaCog, FaWallet, FaFileAlt, FaShoppingCart, FaRocket, FaArrowRight, FaEllipsisH, FaCheck
} from 'react-icons/fa'

// Import Recharts (Cần chạy: npm install recharts)
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
const chartData = [
  { name: 'Apr', sales: 450 }, { name: 'May', sales: 200 }, { name: 'Jun', sales: 100 },
  { name: 'Jul', sales: 220 }, { name: 'Aug', sales: 500 }, { name: 'Sep', sales: 100 },
  { name: 'Oct', sales: 400 }, { name: 'Nov', sales: 230 }, { name: 'Dec', sales: 500 },
];

const projectsData = [
  { name: 'Soft UI XD Version', members: [1, 2, 3, 4], budget: '$14,000', completion: 60, icon: 'XD' },
  { name: 'Add Progress Track', members: [2, 4], budget: '$3,000', completion: 10, icon: 'AT' },
  { name: 'Fix Platform Errors', members: [3, 1], budget: 'Not set', completion: 100, icon: 'SL' },
  { name: 'Launch Mobile App', members: [4, 3, 2, 1], budget: '$20,500', completion: 100, icon: 'SP' },
  { name: 'Add Pricing Page', members: [4], budget: '$500', completion: 25, icon: 'JR' },
];

const ordersData = [
  { title: '$2400, Design changes', date: '22 DEC 7:20 PM', color: 'text-green-500', icon: FaBell },
  { title: 'New order #1832412', date: '21 DEC 11 PM', color: 'text-red-500', icon: FaFileAlt },
  { title: 'Server payments for April', date: '21 DEC 9:34 PM', color: 'text-blue-500', icon: FaShoppingCart },
  { title: 'New card added for order #4395133', date: '20 DEC 2:20 AM', color: 'text-orange-500', icon: FaCreditCard },
  { title: 'Unlock packages for development', date: '18 DEC 4:54 AM', color: 'text-pink-500', icon: FaKey },
];

// --- COMPONENTS CON CHO ADMIN ---

const SidebarItem = ({ icon: Icon, text, active }) => (
  <div className={`flex items-center px-4 py-3 mx-2 mb-1 rounded-xl cursor-pointer transition-all duration-200 
    ${active ? 'bg-white shadow-md text-gray-800 font-semibold' : 'text-gray-500 hover:text-gray-800'}`}>
    <div className={`p-2 rounded-lg mr-3 shadow-sm flex items-center justify-center 
      ${active ? 'bg-gradient-to-tl from-purple-700 to-pink-500 text-white' : 'bg-white text-gray-800'}`}>
      <Icon size={14} />
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

const StatCard = ({ title, value, percentage, icon: Icon, gradient }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-xl font-bold text-gray-800">{value}</h4>
          <span className={`text-sm font-bold ${percentage.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {percentage}
          </span>
        </div>
      </div>
      <div className={`p-3 rounded-lg shadow-md bg-gradient-to-tl ${gradient} text-white flex items-center justify-center`}>
        <Icon size={18} />
      </div>
    </div>
  </div>
);

// --- COMPONENT DASHBOARD (Thay thế AdminHome cũ) ---
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex text-gray-800">
      {/* 1. SIDEBAR */}
      <aside className="w-64 fixed h-full z-10 p-4 hidden lg:block bg-gray-50">
        <div className="h-full overflow-y-auto pr-2">
          {/* Logo */}
          <div className="flex items-center px-4 py-6 mb-2">
            <div className="w-8 h-8 mr-2 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="font-bold text-gray-800">Soft UI Dashboard</span>
          </div>

          <hr className="border-gray-200 mb-4 mx-4" />

          {/* Menu Items */}
          <nav>
            <SidebarItem icon={FaHome} text="Dashboard" active={true} />
            <SidebarItem icon={FaTable} text="Tables" />
            <SidebarItem icon={FaCreditCard} text="Billing" />
            <SidebarItem icon={FaCube} text="Virtual Reality" />
            <SidebarItem icon={FaGlobe} text="RTL" />

            <h6 className="uppercase text-xs font-bold text-gray-400 px-6 mt-6 mb-2">Account Pages</h6>
            <SidebarItem icon={FaUser} text="Profile" />
            <SidebarItem icon={FaSignInAlt} text="Sign In" />
            <SidebarItem icon={FaKey} text="Sign Up" />
          </nav>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 p-6 transition-all duration-300">

        {/* Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-transparent">
          <div className="mb-4 md:mb-0 w-full md:w-auto">
            <nav className="text-sm text-gray-500 mb-1">
              <span className="opacity-50">Pages</span> / <span className="text-gray-800">Dashboard</span>
            </nav>
            <h6 className="font-bold text-gray-800">Dashboard</h6>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><FaSearch size={14} /></span>
              <input
                type="text"
                placeholder="Type here..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-48 bg-white"
              />
            </div>
            <button className="text-gray-500 font-bold text-sm flex items-center gap-1 hover:text-purple-600">
              <FaUser size={14} /> <span className="hidden sm:inline">Sign In</span>
            </button>
            <FaCog size={16} className="text-gray-500 cursor-pointer hover:text-purple-600" />
            <FaBell size={16} className="text-gray-500 cursor-pointer hover:text-purple-600" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Today's Money" value="$53,000" percentage="+55%" icon={FaWallet} gradient="from-purple-700 to-pink-500" />
          <StatCard title="Today's Users" value="2,300" percentage="+3%" icon={FaGlobe} gradient="from-purple-700 to-pink-500" />
          <StatCard title="New Clients" value="+3,462" percentage="-2%" icon={FaFileAlt} gradient="from-purple-700 to-pink-500" />
          <StatCard title="Sales" value="$103,430" percentage="+5%" icon={FaShoppingCart} gradient="from-purple-700 to-pink-500" />
        </div>

        {/* Middle Section (Charts & Promo) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Built by developers */}
          <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[250px]">
            <div className="relative z-10">
              <p className="text-gray-500 font-bold text-sm">Built by developers</p>
              <h5 className="text-xl font-bold text-gray-800 mt-2">Soft UI Dashboard</h5>
              <p className="text-gray-500 text-sm mt-3 mb-8">
                From colors, cards, typography to complex elements, you will find the full documentation.
              </p>
              <a href="#" className="flex items-center text-sm font-bold text-gray-800 hover:text-purple-600">
                Read More <FaArrowRight size={12} className="ml-1" />
              </a>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-l-2xl opacity-20 transform translate-x-4"></div>
          </div>

          {/* Card 2: Work with rockets */}
          <div className="bg-white rounded-2xl p-5 shadow-sm relative overflow-hidden text-white flex flex-col justify-between min-h-[250px]">
            <div className="absolute inset-0 bg-gray-800 z-0">
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
              <FaRocket className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-20" size={100} />
            </div>
            <div className="relative z-10">
              <h5 className="text-xl font-bold mt-2">Work with the rockets</h5>
              <p className="text-sm mt-3 opacity-80">
                Wealth creation is an evolutionarily recent positive-sum game.
              </p>
            </div>
            <a href="#" className="relative z-10 flex items-center text-sm font-bold mt-4 hover:opacity-80">
              Read More <FaArrowRight size={12} className="ml-1" />
            </a>
          </div>

          {/* Card 3: Bar Chart (Active Users) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="bg-gradient-to-tl from-gray-900 to-gray-800 rounded-xl p-4 -mt-8 mb-4 shadow-lg">
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff20" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none' }}
                      itemStyle={{ color: '#333' }}
                    />
                    <Bar dataKey="sales" fill="#fff" barSize={6} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <h6 className="font-bold text-gray-800 mt-1">Active Users</h6>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-green-500">(+23%)</span> than last week
            </p>
            <div className="flex justify-between mt-4 px-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1 text-gray-500 text-xs font-bold"><FaUser size={10} /> Users</div>
                <h4 className="font-bold text-lg mb-1">36K</h4>
                <div className="w-full bg-gray-200 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full w-[60%]"></div></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1 text-gray-500 text-xs font-bold"><FaRocket size={10} /> Clicks</div>
                <h4 className="font-bold text-lg mb-1">2m</h4>
                <div className="w-full bg-gray-200 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full w-[90%]"></div></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1 text-gray-500 text-xs font-bold"><FaWallet size={10} /> Sales</div>
                <h4 className="font-bold text-lg mb-1">435$</h4>
                <div className="w-full bg-gray-200 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full w-[30%]"></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h6 className="font-bold text-gray-800">Projects</h6>
                <p className="text-sm text-gray-500 flex items-center">
                  <FaCheck className="text-blue-500 mr-1" size={10} />
                  <span className="font-bold">30 done</span> &nbsp;this month
                </p>
              </div>
              <FaEllipsisH className="text-gray-400 cursor-pointer" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
                    <th className="pb-3 font-bold pl-2">Companies</th>
                    <th className="pb-3 font-bold">Members</th>
                    <th className="pb-3 font-bold text-center">Budget</th>
                    <th className="pb-3 font-bold text-center">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project, index) => (
                    <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pl-2">
                        <div className="flex items-center">
                          <div className="mr-3 w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
                            {project.icon}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{project.name}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex -space-x-2">
                          {project.members.map((m) => (
                            <div key={m} className="w-6 h-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-[8px] text-gray-500 font-bold">U{m}</div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 text-center text-sm font-bold text-gray-600">{project.budget}</td>
                      <td className="py-3">
                        <div className="w-3/4 mx-auto">
                          <div className="flex justify-between text-xs mb-1 font-bold text-gray-500">
                            <span>{project.completion}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${project.completion === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orders Overview */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="mb-4">
              <h6 className="font-bold text-gray-800">Orders overview</h6>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-green-500">24% this month</span>
              </p>
            </div>

            <div className="relative border-l border-gray-200 ml-2 space-y-6">
              {ordersData.map((order, idx) => (
                <div key={idx} className="ml-6 relative">
                  <span className={`absolute -left-[33px] top-0 bg-white border-2 border-white rounded-full p-1.5 ${order.color}`}>
                    <order.icon size={12} />
                  </span>
                  <h6 className="text-sm font-bold text-gray-800">{order.title}</h6>
                  <p className="text-xs text-gray-400 font-bold">{order.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2025, made with ❤️ by Creative Tim for a better web.</p>
        </footer>

      </main>
    </div>
  )
}

// --- APP CHÍNH ---
function App() {
  return (
    <Routes>
      {/* Route cho Ứng dụng nghe nhạc (Giữ nguyên) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Route cho Dashboard Admin (Giao diện mới) */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App