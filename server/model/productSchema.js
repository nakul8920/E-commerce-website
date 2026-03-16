import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const productSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
    rating: Number,
    reviews: Number,
    asin: String,
    currency: String,
    is_best_seller: Boolean,
    is_amazon_choice: Boolean,
    is_prime: Boolean,
    sales_volume: String
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'product');

const products = mongoose.model('product', productSchema);

export default products;