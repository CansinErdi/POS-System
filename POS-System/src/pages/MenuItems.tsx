import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../types/MenuItem';
import { Ingredient } from '../types/Ingredient';

const MenuItems: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const [formData, setFormData] = useState<{
    name: string;
    ingredients: Array<{ ingredientId: string; quantity: number }>;
  }>({
    name: '',
    ingredients: [{ ingredientId: '', quantity: 0 }]
  });

  useEffect(() => {
    // Fetch menu items and ingredients data
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const menuItemsResponse = await fetch('/api/menu-items');
        // const ingredientsResponse = await fetch('/api/ingredients');
        
        // Mock data
        const mockIngredients: Ingredient[] = [
          { id: '1', name: 'Flour', quantity: 5, unit: 'kg', threshold: 2 },
          { id: '2', name: 'Eggs', quantity: 24, unit: 'pcs', threshold: 10 },
          { id: '3', name: 'Olive Oil', quantity: 0.5, unit: 'L', threshold: 1 },
          { id: '4', name: 'Tomatoes', quantity: 8, unit: 'kg', threshold: 5 },
          { id: '5', name: 'Parmesan', quantity: 1.2, unit: 'kg', threshold: 1 },
          { id: '6', name: 'Garlic', quantity: 0.3, unit: 'kg', threshold: 0.2 },
          { id: '7', name: 'Basil', quantity: 0.1, unit: 'kg', threshold: 0.05 },
          { id: '8', name: 'Salt', quantity: 2, unit: 'kg', threshold: 0.5 },
          { id: '9', name: 'Pepper', quantity: 0.8, unit: 'kg', threshold: 0.2 },
          { id: '10', name: 'Pork Guanciale', quantity: 1.5, unit: 'kg', threshold: 0.5 },
        ];

        const mockMenuItems: MenuItem[] = [
          { 
            id: '1', 
            name: 'Carbonara', 
            ingredients: [
              { ingredientId: '2', quantity: 3 }, // 3 Eggs
              { ingredientId: '5', quantity: 0.1 }, // 0.1kg Parmesan
              { ingredientId: '10', quantity: 0.2 }, // 0.2kg Pork Guanciale
            ]
          },
          { 
            id: '2', 
            name: 'Margherita Pizza', 
            ingredients: [
              { ingredientId: '1', quantity: 0.5 }, // 0.5kg Flour
              { ingredientId: '4', quantity: 0.4 }, // 0.4kg Tomatoes
              { ingredientId: '5', quantity: 0.2 }, // 0.2kg Parmesan
              { ingredientId: '7', quantity: 0.05 }, // 0.05kg Basil
            ]
          },
          {
            id: '3',
            name: 'Bruschetta',
            ingredients: [
              { ingredientId: '1', quantity: 0.2 }, // 0.2kg Flour (for bread)
              { ingredientId: '4', quantity: 0.3 }, // 0.3kg Tomatoes
              { ingredientId: '6', quantity: 0.05 }, // 0.05kg Garlic
              { ingredientId: '7', quantity: 0.03 }, // 0.03kg Basil
              { ingredientId: '3', quantity: 0.05 }, // 0.05L Olive Oil
            ]
          }
        ];

        setIngredients(mockIngredients);
        setMenuItems(mockMenuItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (menuItem?: MenuItem) => {
    if (menuItem) {
      setCurrentMenuItem(menuItem);
      setFormData({
        name: menuItem.name,
        ingredients: [...menuItem.ingredients]
      });
    } else {
      setCurrentMenuItem(null);
      setFormData({
        name: '',
        ingredients: [{ ingredientId: '', quantity: 0 }]
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMenuItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index: number, field: 'ingredientId' | 'quantity', value: string | number) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: field === 'quantity' ? Number(value) : value,
    };
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };

  const addIngredientField = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredientId: '', quantity: 0 }]
    }));
  };

  const removeIngredientField = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        ingredients: updatedIngredients
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out any empty ingredients
    const validIngredients = formData.ingredients.filter(
      ing => ing.ingredientId !== '' && ing.quantity > 0
    );

    if (validIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    const menuItemData = {
      name: formData.name,
      ingredients: validIngredients
    };
    
    // In a real app, this would make an API request
    if (currentMenuItem) {
      // Update existing menu item
      const updatedMenuItems = menuItems.map(item => 
        item.id === currentMenuItem.id 
          ? { ...item, ...menuItemData } 
          : item
      );
      setMenuItems(updatedMenuItems);
    } else {
      // Add new menu item
      const newMenuItem: MenuItem = {
        id: Date.now().toString(), // In a real app, the ID would come from the backend
        ...menuItemData
      };
      setMenuItems([...menuItems, newMenuItem]);
    }
    
    handleCloseModal();
  };

  const handleDeleteMenuItem = (id: string) => {
    // In a real app, this would make an API request
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const getIngredientName = (id: string) => {
    const ingredient = ingredients.find(ing => ing.id === id);
    return ingredient ? ingredient.name : 'Unknown Ingredient';
  };

  const getIngredientUnit = (id: string) => {
    const ingredient = ingredients.find(ing => ing.id === id);
    return ingredient ? ingredient.unit : '';
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800">Menu Items</h1>
          <p className="text-gray-600">Manage your restaurant menu</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Menu Item
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredMenuItems.map(menuItem => (
          <motion.div 
            key={menuItem.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpand(menuItem.id)}
            >
              <h3 className="text-lg font-medium text-gray-900">{menuItem.name}</h3>
              <div className="flex items-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(menuItem);
                  }}
                  className="text-primary-600 hover:text-primary-900 mr-3"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMenuItem(menuItem.id);
                  }}
                  className="text-red-600 hover:text-red-900 mr-3"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {expandedItems.includes(menuItem.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {expandedItems.includes(menuItem.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 overflow-hidden"
                >
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Ingredients:</h4>
                    <ul className="space-y-2">
                      {menuItem.ingredients.map((ing, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span className="text-gray-800">{getIngredientName(ing.ingredientId)}</span>
                          <span className="text-gray-600">
                            {ing.quantity} {getIngredientUnit(ing.ingredientId)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {filteredMenuItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-card p-8 text-center">
            <p className="text-gray-500">No menu items found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {currentMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                        </h3>
                        <button
                          onClick={handleCloseModal}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Menu Item Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Ingredients
                            </label>
                            <button
                              type="button"
                              onClick={addIngredientField}
                              className="text-primary-600 hover:text-primary-700 text-sm"
                            >
                              + Add Ingredient
                            </button>
                          </div>
                          
                          {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                              <select
                                value={ingredient.ingredientId}
                                onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}
                                required
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                              >
                                <option value="">Select Ingredient</option>
                                {ingredients.map(ing => (
                                  <option key={ing.id} value={ing.id}>
                                    {ing.name} ({ing.quantity} {ing.unit} available)
                                  </option>
                                ))}
                              </select>
                              <div className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                                  />
                                  {ingredient.ingredientId && (
                                    <span className="text-gray-500 text-sm">
                                      {getIngredientUnit(ingredient.ingredientId)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeIngredientField(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                                disabled={formData.ingredients.length === 1}
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            {currentMenuItem ? 'Update' : 'Add'}
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseModal}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuItems;