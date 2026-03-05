import express from 'express';
const router = express.Router();

import { getTaxes, createTax, updateTax, deleteTax } from '../controllers/taxController.js';

router.get('/', getTaxes);
router.post('/', createTax);
router.put('/:id', updateTax);
router.delete('/:id', deleteTax);

export default router;