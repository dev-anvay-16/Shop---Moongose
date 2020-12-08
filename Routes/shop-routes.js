const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const adminData = require('./admin-routes');

const shopProductsController = require('../controllers/shop');

const routes = express.Router();

const isAuth = require('../middleware/isauth');

routes.get('/cart' ,isAuth,shopProductsController.getCart);

// routes.get('/checkout',shopProductsController.getCheckout);

routes.get('/shop',shopProductsController.getProductsPage);

routes.get('/shop/:productId',shopProductsController.getProductPage);

routes.post('/cart', isAuth,shopProductsController.postCart);

routes.post('/cart-delete', isAuth,shopProductsController.postDeleteCartItem);

 routes.post('/create-order',isAuth, shopProductsController.postOrder);

routes.get('/orders',isAuth, shopProductsController.getOrders);
 


routes.get('/',shopProductsController.getHome);




module.exports = routes;