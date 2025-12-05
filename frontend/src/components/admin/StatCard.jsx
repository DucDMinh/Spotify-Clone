const StatCard = ({ title, value, percentage, icon: Icon, gradient }) => (
    // dark:bg-gray-800
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-start">
            <div>
                {/* dark:text-gray-400 */}
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    {/* dark:text-white */}
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">{value}</h4>
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

export default StatCard;