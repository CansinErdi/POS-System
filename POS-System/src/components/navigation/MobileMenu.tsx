import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, ShoppingBasket, Menu, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/ingredients', name: 'Ingredients', icon: <ShoppingBasket size={20} /> },
    { path: '/menu-items', name: 'Menu Items', icon: <Menu size={20} /> },
    { path: '/reports', name: 'Reports', icon: <BarChart size={20} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={() => setIsOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-64 bg-white p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-gray-800">Menu</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-md text-gray-700 hover:text-gray-900">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.path} className="mb-2">
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;