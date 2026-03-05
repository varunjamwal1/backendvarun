import express from 'express';
const router = express.Router();
import { getOrders, createOrder, getOrderStats } from '../controllers/orderController.js';

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/stats', getOrderStats);

export default router;