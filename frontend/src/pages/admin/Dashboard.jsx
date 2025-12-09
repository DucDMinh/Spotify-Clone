import { FaWallet, FaGlobe, FaFileAlt, FaShoppingCart, FaArrowRight, FaRocket, FaUser, FaCheck, FaEllipsisH } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/admin/StatCard';
import { chartData, projectsData, ordersData } from '../../data/mockData';

const AdminHome = () => {
    return (
        <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Today's Money" value="$53,000" percentage="+55%" icon={FaWallet} gradient="from-purple-700 to-pink-500" />
                <StatCard title="Today's Users" value="2,300" percentage="+3%" icon={FaGlobe} gradient="from-purple-700 to-pink-500" />
                <StatCard title="New Clients" value="+3,462" percentage="-2%" icon={FaFileAlt} gradient="from-purple-700 to-pink-500" />
                <StatCard title="Sales" value="$103,430" percentage="+5%" icon={FaShoppingCart} gradient="from-purple-700 to-pink-500" />
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Card 1: Promo 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[250px] transition-colors duration-300">
                    <div className="relative z-10">
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">Built by developers</p>
                        <h5 className="text-xl font-bold text-gray-800 dark:text-white mt-2">Soft UI Dashboard</h5>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 mb-8">From colors, cards, typography to complex elements, you will find the full documentation.</p>
                        <a href="#" className="flex items-center text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                            Read More <FaArrowRight size={12} className="ml-1" />
                        </a>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-tl from-purple-700 to-pink-500 rounded-l-2xl opacity-20 transform translate-x-4"></div>
                </div>

                {/* Card 2: Promo 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm relative overflow-hidden text-white flex flex-col justify-between min-h-[250px] transition-colors duration-300">
                    <div className="absolute inset-0 bg-gray-800 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
                        <FaRocket className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-20" size={100} />
                    </div>
                    <div className="relative z-10">
                        <h5 className="text-xl font-bold mt-2 text-white">Work with the rockets</h5>
                        <p className="text-sm mt-3 opacity-80 text-white">Wealth creation is an evolutionarily recent positive-sum game.</p>
                    </div>
                    <a href="#" className="relative z-10 flex items-center text-sm font-bold mt-4 hover:opacity-80 text-white">
                        Read More <FaArrowRight size={12} className="ml-1" />
                    </a>
                </div>

                {/* Card 3: Bar Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors duration-300">
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
                                    // Lưu ý: Recharts Tooltip style khó custom bằng class Tailwind trực tiếp, nên giữ style object này hoặc dùng CustomTooltip
                                    />
                                    <Bar dataKey="sales" fill="#fff" barSize={6} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <h6 className="font-bold text-gray-800 dark:text-white mt-1">Active Users</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-bold text-green-500">(+23%)</span> than last week</p>

                    <div className="flex justify-between mt-4 px-2 text-gray-800 dark:text-gray-200">
                        {/* Các chỉ số nhỏ dưới biểu đồ */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 mb-1 text-gray-500 dark:text-gray-400 text-xs font-bold"><FaUser size={10} /> Users</div>
                            <h4 className="font-bold text-lg mb-1">36K</h4>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full w-[60%]"></div></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 mb-1 text-gray-500 dark:text-gray-400 text-xs font-bold"><FaRocket size={10} /> Clicks</div>
                            <h4 className="font-bold text-lg mb-1">2m</h4>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full w-[90%]"></div></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1 mb-1 text-gray-500 dark:text-gray-400 text-xs font-bold"><FaWallet size={10} /> Sales</div>
                            <h4 className="font-bold text-lg mb-1">435$</h4>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full w-[30%]"></div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Projects Table */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm transition-colors duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h6 className="font-bold text-gray-800 dark:text-white">Projects</h6>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <FaCheck className="text-blue-500 mr-1" size={10} />
                                <span className="font-bold">30 done</span> &nbsp;this month
                            </p>
                        </div>
                        <FaEllipsisH className="text-gray-400 cursor-pointer" />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-400 dark:text-gray-500 text-xs uppercase border-b border-gray-100 dark:border-gray-700">
                                    <th className="pb-3 font-bold pl-2">Companies</th>
                                    <th className="pb-3 font-bold">Members</th>
                                    <th className="pb-3 font-bold text-center">Budget</th>
                                    <th className="pb-3 font-bold text-center">Completion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsData.map((project, index) => (
                                    <tr key={index} className="border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="py-3 pl-2">
                                            <div className="flex items-center">
                                                <div className="mr-3 w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 text-xs">{project.icon}</div>
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{project.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="flex -space-x-2">
                                                {project.members.map((m) => (
                                                    <div key={m} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 flex items-center justify-center text-[8px] text-gray-500 font-bold">U{m}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 text-center text-sm font-bold text-gray-600 dark:text-gray-400">{project.budget}</td>
                                        <td className="py-3">
                                            <div className="w-3/4 mx-auto">
                                                <div className="flex justify-between text-xs mb-1 font-bold text-gray-500 dark:text-gray-400"><span>{project.completion}%</span></div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                                    <div className={`h-1 rounded-full ${project.completion === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${project.completion}%` }}></div>
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
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm transition-colors duration-300">
                    <div className="mb-4">
                        <h6 className="font-bold text-gray-800 dark:text-white">Orders overview</h6>
                        <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-bold text-green-500">24% this month</span></p>
                    </div>

                    <div className="relative border-l border-gray-200 dark:border-gray-700 ml-2 space-y-6">
                        {ordersData.map((order, idx) => (
                            <div key={idx} className="ml-6 relative">
                                <span className={`absolute -left-[33px] top-0 bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-800 rounded-full p-1.5 ${order.color}`}><order.icon size={12} /></span>
                                <h6 className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.title}</h6>
                                <p className="text-xs text-gray-400 dark:text-gray-500 font-bold">{order.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;