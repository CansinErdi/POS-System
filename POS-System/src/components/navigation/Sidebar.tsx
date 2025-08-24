import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChefHat, 
  BarChart, 
  Home, 
  ShoppingBasket, 
  Menu 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/ingredients', name: 'Ingredients', icon: <ShoppingBasket size={20} /> },
    { path: '/menu-items', name: 'Menu Items', icon: <Menu size={20} /> },
    { path: '/reports', name: 'Reports', icon: <BarChart size={20} /> },
  ];

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200"
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <ChefHat className="h-8 w-8 text-primary-500" />
        <h1 className="ml-2 text-xl font-display font-bold text-gray-800">Cucina Stock</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2 px-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;