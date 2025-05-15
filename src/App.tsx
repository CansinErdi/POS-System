import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Ingredients from './pages/Ingredients';
import MenuItems from './pages/MenuItems';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="menu-items" element={<MenuItems />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;