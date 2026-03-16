

import Product from './model/productSchema.js';
import { products } from './constants/product.js';

const DefaultData = async () => {
    try {
        const existing = await Product.estimatedDocumentCount();
        if (existing > 0) return;

        await Product.insertMany(products);
        console.log('Default data imported successfully');
        
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

export default DefaultData;