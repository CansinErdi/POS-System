import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Activity } from '../../types/Activity';

interface RecentActivityCardProps {
  activities: Activity[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'sold':
        return <span className="h-8 w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center">S</span>;
      case 'added':
        return <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">A</span>;
      case 'updated':
        return <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center">U</span>;
      default:
        return <span className="h-8 w-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">?</span>;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.action) {
      case 'sold':
        return `${activity.quantity}× ${activity.item} sold`;
      case 'added':
        return `Added ${activity.quantity} ${activity.unit} of ${activity.item}`;
      case 'updated':
        return `Updated ${activity.item} stock to ${activity.quantity} ${activity.unit}`;
      default:
        return `${activity.action} ${activity.item}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card h-full">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="p-6">
        <motion.ul variants={container} initial="hidden" animate="show" className="space-y-6">
          {activities.map((activity) => (
            <motion.li key={activity.id} variants={item} className="flex">
              <div className="mr-4 flex-shrink-0">
                {getActivityIcon(activity.action)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {getActivityText(activity)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <div className="mt-6 text-center">
          <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;