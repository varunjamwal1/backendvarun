const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: { type: String },
    phone: { type: String },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        name: String,
        price: Number,
        quantity: Number,
    }],
    subtotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['online', 'cash'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);