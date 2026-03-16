import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
// import { addItemInCart } from '../controller/cart-controller.js';
import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';
import { 
    registerSeller, 
    getSellerById, 
    getSellerByEmail, 
    updateSellerProfile, 
    getAllSellers,
    verifySellerEmail,
    disableSeller
} from '../controller/seller-controller.js';

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

// router.post('/cart/add', addItemInCart);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

// Seller routes
router.post('/seller/register', registerSeller);
router.get('/seller/all', getAllSellers);
router.get('/seller/:id', getSellerById);
router.get('/seller/email/:email', getSellerByEmail);
router.put('/seller/update/:id', updateSellerProfile);
router.put('/seller/verify/:id', verifySellerEmail);
router.put('/seller/disable/:id', disableSeller);

export default router;