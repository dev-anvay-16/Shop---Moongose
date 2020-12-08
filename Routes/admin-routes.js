const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const adminAddProductController = require('../controllers/admin');

const isAuth = require('../middleware/isauth');

const isAdmin = require('../middleware/isAdmin');

const routes = express.Router();

 routes.get('/add-product' , isAuth ,isAdmin, adminAddProductController.getAddProductPage);

routes.get('/products',isAuth,isAdmin,adminAddProductController.getProductsPage);

routes.get('/edit-product/:productId',isAuth,isAdmin,adminAddProductController.getEditProductPage);

routes.post('/edit-product' ,isAuth,isAdmin, adminAddProductController.postEditProductPage);

 routes.post('/add-product' ,isAuth,isAdmin,adminAddProductController.postAddProductPage);

routes.post('/delete-product' ,isAuth,isAdmin, adminAddProductController.postDelete );

exports.routes = routes;
