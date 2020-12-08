
const Product = require('../models/product');
const Order = require('../models/orders');
const date = require('../models/getDate');
const product = require('../models/product');




exports.getProductsPage = (req,res,next) => {
   Product.find().then(product => {
      res.render('Customer/product-list',{pageTitle : 'Shop' , products: product , path : '/shop',user: req.session.user});
   });
};

exports.getProductPage = (req,res,next) => {
    const prodId = req.params.productId;  
    Product.findById(prodId)
        .then((particularProduct) => {
        res.render('Customer/product-details',{pageTitle : 'Shop' ,
            product: particularProduct,
        user: req.session.user,
         //cart : cartProducts.products,
         //totalPrice : cartProducts.totalPrice,
        path : `/shop`});
        }).catch(err => {
            console.log(err);
        })  
};

exports.getHome = (req,res,next) => {
    Product.find().then(product => {
    res.render('Customer/home',{pageTitle : 'Home' , products: product , path : '/home',user: req.session.user});
    });
};


exports.getCart = (req, res, next) => {
    console.log(req.user);
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user);
            const products = user.cart.items;
            //console.log(products);

            let total = 0;
                for (let product of products) {
                total += product.productId.price * product.quantity;}
                res.render('Customer/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                    totalPrice: total,
                user: req.session.user
                });
            
        })
        
};

exports.postDeleteCartItem = (req,res,next) => {
    const id = req.body.productId;
    req.user.deleteItemFromCart(id);
    res.redirect('/cart');
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.prodId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
   
};


exports.postOrder = (req,res,next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
           // console.log(user);
            const products = user.cart.items.map(product => {
             //   console.log(product.productId.title);
                return {
                    quantity: product.quantity, product: {
                        _id : product.productId._id,
                        title: product.productId.title,
                        price: product.productId.price,
                        imageUrl : product.productId.imageUrl
                }  };
            });
            console.log(products)
            const order = new Order({
                date: date,
                user: {
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    userId : user._id
                },
                products : products 
            })
            
            return order.save();
        }).then(result => {
            req.user.clearCart();
            res.redirect('/orders')
        })

}

exports.getOrders = (req, res, next) => {
    console.log(req.session.user._id);
    Order.find({'user.userId' : req.session.user._id})
    .then(orders => {
        console.log(orders);
      res.render('Customer/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
          orders: orders,
        user: req.session.user   
      });
    })
    .catch(err => console.log(err));
}

exports.getCheckout = (req,res,next) => {
    res.render('Customer/checkout',{pageTitle : 'Checkout' , products: product , path : '/checkout',user: req.session.user});
}






