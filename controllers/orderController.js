import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    const totalSalesResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalSales = totalSalesResult[0]?.total || 0;

    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });
    
    const todaySalesResult = await Order.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const todaySales = todaySalesResult[0]?.total || 0;

    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    res.json({
      totalOrders,
      totalSales,
      todayOrders,
      todaySales,
      pendingOrders
    });
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};