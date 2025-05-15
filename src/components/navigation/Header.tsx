import React, { useState } from 'react';
import { Menu as MenuIcon, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="bg-white border-b border-gray-200 z-10"
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link to="/" className="ml-2 flex items-center">
            <ChefHat className="h-6 w-6 text-primary-500" />
            <h1 className="ml-2 text-lg font-display font-bold text-gray-800">Cucina Stock</h1>
          </Link>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <div className="relative w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 font-semibold">
            RS
          </div>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
    </motion.header>
  );
};

export default Header;