import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'green' | 'red';
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 text-primary-500';
      case 'secondary':
        return 'bg-secondary-50 text-secondary-500';
      case 'accent':
        return 'bg-accent-50 text-accent-500';
      case 'green':
        return 'bg-green-50 text-green-500';
      case 'red':
        return 'bg-red-50 text-red-500';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg p-6 shadow-card h-full"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        </div>
        <div className={`p-2 rounded-md ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <>
              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-500">Attention needed</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">Stock levels good</span>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;