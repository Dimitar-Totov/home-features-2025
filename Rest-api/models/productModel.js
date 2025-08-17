const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    dimensions: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Product', productSchema);
