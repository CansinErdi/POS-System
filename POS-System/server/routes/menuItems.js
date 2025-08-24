import express from 'express';
import MenuItem from '../models/MenuItem.js';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const { name, ingredients } = req.body;
    
    // Validate that all ingredient IDs exist
    for (const item of ingredients) {
      const ingredient = await Ingredient.findById(item.ingredientId);
      if (!ingredient) {
        return res.status(400).json({ message: `Ingredient with ID ${item.ingredientId} not found` });
      }
    }
    
    const newMenuItem = new MenuItem({
      name,
      ingredients
    });
    
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const { name, ingredients } = req.body;
    
    // Validate that all ingredient IDs exist
    for (const item of ingredients) {
      const ingredient = await Ingredient.findById(item.ingredientId);
      if (!ingredient) {
        return res.status(400).json({ message: `Ingredient with ID ${item.ingredientId} not found` });
      }
    }
    
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        ingredients,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Sell a menu item (decrease ingredient quantities)
router.post('/:id/sell', async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    // Check if we have enough ingredients
    for (const item of menuItem.ingredients) {
      const ingredient = await Ingredient.findById(item.ingredientId);
      
      if (!ingredient) {
        return res.status(400).json({ message: `Ingredient with ID ${item.ingredientId} not found` });
      }
      
      if (ingredient.quantity < item.quantity * quantity) {
        return res.status(400).json({ 
          message: `Not enough ${ingredient.name} in stock. Required: ${item.quantity * quantity} ${ingredient.unit}, Available: ${ingredient.quantity} ${ingredient.unit}` 
        });
      }
    }
    
    // Update ingredient quantities
    for (const item of menuItem.ingredients) {
      const ingredient = await Ingredient.findById(item.ingredientId);
      
      await Ingredient.findByIdAndUpdate(
        item.ingredientId,
        {
          quantity: ingredient.quantity - (item.quantity * quantity),
          updatedAt: Date.now()
        }
      );
    }
    
    res.status(200).json({ message: `Sold ${quantity} ${menuItem.name}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;