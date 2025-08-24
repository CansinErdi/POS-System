import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ingredient } from '../types/Ingredient';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    unit: '',
    threshold: 0
  });

  useEffect(() => {
    // Fetch ingredients data
    const fetchIngredients = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/ingredients');
        // const data = await response.json();
        
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
        
        setIngredients(mockIngredients);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleOpenModal = (ingredient?: Ingredient) => {
    if (ingredient) {
      setCurrentIngredient(ingredient);
      setFormData({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        threshold: ingredient.threshold
      });
    } else {
      setCurrentIngredient(null);
      setFormData({
        name: '',
        quantity: 0,
        unit: '',
        threshold: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIngredient(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'threshold' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API request
    if (currentIngredient) {
      // Update existing ingredient
      const updatedIngredients = ingredients.map(ing => 
        ing.id === currentIngredient.id 
          ? { ...ing, ...formData } 
          : ing
      );
      setIngredients(updatedIngredients);
    } else {
      // Add new ingredient
      const newIngredient: Ingredient = {
        id: Date.now().toString(), // In a real app, the ID would come from the backend
        ...formData
      };
      setIngredients([...ingredients, newIngredient]);
    }
    
    handleCloseModal();
  };

  const handleDeleteIngredient = (id: string) => {
    // In a real app, this would make an API request
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const filteredIngredients = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatusColor = (ingredient: Ingredient) => {
    if (ingredient.quantity <= 0) return 'text-red-600 bg-red-50';
    if (ingredient.quantity <= ingredient.threshold) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800">Ingredients</h1>
          <p className="text-gray-600">Manage your restaurant ingredients</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Ingredient
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Threshold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIngredients.map((ingredient) => (
                <motion.tr 
                  key={ingredient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ingredient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ingredient.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ingredient.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ingredient.threshold}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStockStatusColor(ingredient)}`}>
                      {ingredient.quantity <= 0 
                        ? 'Out of Stock' 
                        : ingredient.quantity <= ingredient.threshold 
                          ? 'Low Stock' 
                          : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(ingredient)}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteIngredient(ingredient.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
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
                          {currentIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}
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
                            Name
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
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                            Unit
                          </label>
                          <select
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                          >
                            <option value="">Select a unit</option>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="g">Grams (g)</option>
                            <option value="L">Liters (L)</option>
                            <option value="ml">Milliliters (ml)</option>
                            <option value="pcs">Pieces (pcs)</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
                            Low Stock Threshold
                          </label>
                          <input
                            type="number"
                            id="threshold"
                            name="threshold"
                            value={formData.threshold}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"
                          />
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            {currentIngredient ? 'Update' : 'Add'}
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

export default Ingredients;