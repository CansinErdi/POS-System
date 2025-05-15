import React, { useState, useEffect } from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import LowStockCard from '../components/ui/LowStockCard';
import RecentActivityCard from '../components/ui/RecentActivityCard';

// Types
import { Ingredient } from '../types/Ingredient';
import { MenuItem } from '../types/MenuItem';
import { Activity } from '../types/Activity';

// Mock data (would be fetched from API)
const mockActivities: Activity[] = [
  { id: '1', action: 'sold', item: 'Carbonara', quantity: 2, timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: '2', action: 'added', item: 'Flour', quantity: 5, unit: 'kg', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
  { id: '3', action: 'sold', item: 'Margherita Pizza', quantity: 3, timestamp: new Date(Date.now() - 1000 * 60 * 180) },
  { id: '4', action: 'updated', item: 'Olive Oil', quantity: 2, unit: 'L', timestamp: new Date(Date.now() - 1000 * 60 * 240) },
];

const Dashboard: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activities] = useState<Activity[]>(mockActivities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        // const ingredientsRes = await fetch('/api/ingredients');
        // const ingredients = await ingredientsRes.json();
        // setIngredients(ingredients);
        
        // For now, we'll use mock data
        setIngredients([
          { id: '1', name: 'Flour', quantity: 5, unit: 'kg', threshold: 2 },
          { id: '2', name: 'Eggs', quantity: 24, unit: 'pcs', threshold: 10 },
          { id: '3', name: 'Olive Oil', quantity: 0.5, unit: 'L', threshold: 1 },
          { id: '4', name: 'Tomatoes', quantity: 8, unit: 'kg', threshold: 5 },
          { id: '5', name: 'Parmesan', quantity: 1.2, unit: 'kg', threshold: 1 },
        ]);
        
        setMenuItems([
          { 
            id: '1', 
            name: 'Carbonara', 
            ingredients: [
              { ingredientId: '2', quantity: 3 }, // 3 Eggs
              { ingredientId: '5', quantity: 0.1 }, // 0.1kg Parmesan
            ]
          },
          { 
            id: '2', 
            name: 'Margherita Pizza', 
            ingredients: [
              { ingredientId: '1', quantity: 0.5 }, // 0.5kg Flour
              { ingredientId: '4', quantity: 0.4 }, // 0.4kg Tomatoes
              { ingredientId: '5', quantity: 0.2 }, // 0.2kg Parmesan
            ]
          },
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Low stock ingredients
  const lowStockIngredients = ingredients.filter(
    (ingredient) => ingredient.quantity <= ingredient.threshold
  );

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

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of your restaurant stock</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <motion.div variants={item}>
          <StatCard 
            title="Total Ingredients" 
            value={ingredients.length} 
            icon={<ArrowUpRight className="h-6 w-6 text-secondary-500" />}
            color="secondary"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard 
            title="Menu Items" 
            value={menuItems.length} 
            icon={<ArrowUpRight className="h-6 w-6 text-primary-500" />}
            color="primary"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard 
            title="Low Stock Items" 
            value={lowStockIngredients.length}
            icon={<AlertTriangle className="h-6 w-6 text-accent-500" />}
            color="accent"
            trend={lowStockIngredients.length > 0 ? 'up' : 'down'}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard 
            title="Today's Sales" 
            value={5}
            icon={<ArrowUpRight className="h-6 w-6 text-green-500" />}
            color="green"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={item}
          className="lg:col-span-2"
        >
          <RecentActivityCard activities={activities} />
        </motion.div>
        <motion.div variants={item}>
          <LowStockCard ingredients={lowStockIngredients} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;