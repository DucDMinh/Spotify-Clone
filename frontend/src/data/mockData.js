// src/data/mockData.js
import { FaBell, FaFileAlt, FaShoppingCart, FaCreditCard, FaKey } from 'react-icons/fa';

export const chartData = [
    { name: 'Apr', sales: 450 }, { name: 'May', sales: 200 }, { name: 'Jun', sales: 100 },
    { name: 'Jul', sales: 220 }, { name: 'Aug', sales: 500 }, { name: 'Sep', sales: 100 },
    { name: 'Oct', sales: 400 }, { name: 'Nov', sales: 230 }, { name: 'Dec', sales: 500 },
];

export const projectsData = [
    { name: 'Soft UI XD Version', members: [1, 2, 3, 4], budget: '$14,000', completion: 60, icon: 'XD' },
    { name: 'Add Progress Track', members: [2, 4], budget: '$3,000', completion: 10, icon: 'AT' },
    { name: 'Fix Platform Errors', members: [3, 1], budget: 'Not set', completion: 100, icon: 'SL' },
    { name: 'Launch Mobile App', members: [4, 3, 2, 1], budget: '$20,500', completion: 100, icon: 'SP' },
    { name: 'Add Pricing Page', members: [4], budget: '$500', completion: 25, icon: 'JR' },
];

export const ordersData = [
    { title: '$2400, Design changes', date: '22 DEC 7:20 PM', color: 'text-green-500', icon: FaBell },
    { title: 'New order #1832412', date: '21 DEC 11 PM', color: 'text-red-500', icon: FaFileAlt },
    { title: 'Server payments for April', date: '21 DEC 9:34 PM', color: 'text-blue-500', icon: FaShoppingCart },
    { title: 'New card added for order #4395133', date: '20 DEC 2:20 AM', color: 'text-orange-500', icon: FaCreditCard },
    { title: 'Unlock packages for development', date: '18 DEC 4:54 AM', color: 'text-pink-500', icon: FaKey },
];