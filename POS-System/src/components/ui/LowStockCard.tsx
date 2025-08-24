import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Ingredient } from '../../types/Ingredient';

interface LowStockCardProps {
  ingredients: Ingredient[];
}

const LowStockCard: React.FC<LowStockCardProps> = ({ ingredients }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="bg-white rounded-lg shadow-card h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Low Stock Items</h3>
          <AlertTriangle className="h-5 w-5 text-accent-500" />
        </div>
      </div>
      <div className="p-6">
        {ingredients.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">All items are well-stocked</p>
          </div>
        ) : (
          <motion.ul variants={container} initial="hidden" animate="show" className="space-y-4">
            {ingredients.map((ingredient) => (
              <motion.li 
                key={ingredient.id} 
                variants={item}
                className="flex justify-between items-center p-3 bg-red-50 rounded-md"
              >
                <div>
                  <p className="font-medium text-gray-800">{ingredient.name}</p>
                  <p className="text-sm text-gray-500">
                    Threshold: {ingredient.threshold} {ingredient.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-red-600">
                    {ingredient.quantity} {ingredient.unit}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-primary-50 text-primary-600 rounded-md font-medium hover:bg-primary-100 transition-colors">
            Restock Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowStockCard;