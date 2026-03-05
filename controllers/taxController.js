import Tax from '../models/Tax.js';

export const getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json(taxes);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

export const createTax = async (req, res) => {
  try {
    const tax = await Tax.create(req.body);
    res.status(201).json(tax);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

export const updateTax = async (req, res) => {
  try {
    const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tax);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

export const deleteTax = async (req, res) => {
  try {
    await Tax.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tax deleted' });
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};