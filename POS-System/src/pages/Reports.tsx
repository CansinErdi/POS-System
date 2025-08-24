import React, { useState } from 'react';
import { BarChart3, TrendingUp, LineChart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('usage');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Mock data for charts (in a real app, this would come from API)
  const mockIngredientUsage = [
    { name: 'Flour', usage: 12.5 },
    { name: 'Eggs', usage: 48 },
    { name: 'Olive Oil', usage: 3.2 },
    { name: 'Tomatoes', usage: 18.7 },
    { name: 'Parmesan', usage: 5.4 },
  ];

  const mockPopularItems = [
    { name: 'Carbonara', count: 32 },
    { name: 'Margherita Pizza', count: 28 },
    { name: 'Bruschetta', count: 17 },
    { name: 'Lasagna', count: 12 },
    { name: 'Tiramisu', count: 10 },
  ];

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600">Analytics and statistics for your restaurant</p>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center ${
            activeTab === 'usage'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('usage')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Ingredient Usage
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center ${
            activeTab === 'popular'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('popular')}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Popular Items
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {activeTab === 'usage' ? 'Ingredient Usage This Month' : 'Most Popular Menu Items'}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
            </button>
            <select
              className="rounded-md border border-gray-300 py-2 px-3 text-sm"
              defaultValue="thisMonth"
            >
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastThreeMonths">Last 3 Months</option>
            </select>
          </div>
        </div>

        {activeTab === 'usage' ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {mockIngredientUsage.map((item, index) => (
              <motion.div key={index} variants={item} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.usage} {index === 1 ? 'pcs' : 'kg'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.usage / 20) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-2.5 rounded-full ${
                      index % 3 === 0
                        ? 'bg-primary-500'
                        : index % 3 === 1
                        ? 'bg-secondary-500'
                        : 'bg-accent-500'
                    }`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {mockPopularItems.map((item, index) => (
              <motion.div key={index} variants={item} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.count} sold</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / 35) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-2.5 rounded-full ${
                      index % 3 === 0
                        ? 'bg-primary-500'
                        : index % 3 === 1
                        ? 'bg-secondary-500'
                        : 'bg-accent-500'
                    }`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-8 flex justify-center">
          <LineChart className="h-6 w-6 text-gray-400 mr-2" />
          <span className="text-gray-500 text-sm">
            More detailed analytics coming soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reports;