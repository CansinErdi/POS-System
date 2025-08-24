import express from 'express';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Get all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single ingredient
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new ingredient
router.post('/', async (req, res) => {
  try {
    const { name, quantity, unit, threshold } = req.body;
    
    const newIngredient = new Ingredient({
      name,
      quantity,
      unit,
      threshold
    });
    
    const savedIngredient = await newIngredient.save();
    res.status(201).json(savedIngredient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update an ingredient
router.put('/:id', async (req, res) => {
  try {
    const { name, quantity, unit, threshold } = req.body;
    
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      {
        name,
        quantity,
        unit,
        threshold,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    
    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete an ingredient
router.delete('/:id', async (req, res) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
    
    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    
    res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;