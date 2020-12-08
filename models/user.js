// const mongodb = require("mongodb");
// const getDb = require('../util/database').getDb;
const date = require('./getDate');

const moongoose = require('mongoose');
const Order = require('./orders');

const Schema = moongoose.Schema;

const UserSchema = new Schema({
  type: {
    type: String,
    required:true
    },
    firstName: {
        type: String,
        required:true
  },
  lastName: {
        type: String,
        required:true
  },
  mobile: {
        type: Number,
        required:true
    },
    email: {
        type: String,
        required:true
  },
    password: {
        type: String,
        required:true
    },
    cart: {
        items: [{
            productId: {
                type: Object,
                ref : 'Product',
                required : true
            },
            quantity: {
                type: Number,
                required : true
            }
        }]
    }
})

UserSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
}

UserSchema.methods.deleteItemFromCart = function (id) {
    const updatedCartItems = this.cart.items.filter(item => { 
         return item._id.toString() !== id.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

UserSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
}

// UserSchema.methods.addOrder = function () {
//     const order = new Order({
//         date: date, 
//         products : this.cart.items
//     })
//     console.log(this.cart.items);
//     order.save();
//     this.cart.items = [];
//     return this.save();
// }


// class User{

//     constructor(username, email ,cart, id) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart;
        
//         this.id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('Users').insertOne(this);
//     }

//     addToCart(product) {
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity
//       });
//     }
//     const updatedCart = {
//       items: updatedCartItems
//     };
//     const db = getDb();
//     return db
//       .collection('Users')
//       .updateOne(
//         { _id: new mongodb.ObjectId(this.id) },
//         { $set: { cart: updatedCart } }
//       );
//     }

//     getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     });
//     return db
//       .collection('All Data')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       });
//     }

//     deleteItemFromCart(id) {
//        const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== id.toString();
//     });
//     const db = getDb();
//     return db
//       .collection('Users')
//       .updateOne(
//         { _id: new mongodb.ObjectId(this.id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items : products,
//                     user : {
//                         _id: new mongodb.ObjectId(this.id),
//                         name: this.username,
//                         email : this.email
//                     } ,
//                     date: date
//                 }
//                   return db.collection('orders').insertOne(order).then(result => {
//             this.cart = { items: [] };
//             return db.collection('Users').updateOne({ _id: new mongodb.ObjectId(this.id)}, {$set: {cart: { items: [] } }});
//         });
//         })
      
//     }

//     getOrders() {
//         const db = getDb();
//         return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this.id) }).toArray();
        
//     }



//     static findById(userId) {
//         const db = getDb();
//         return db.collection('Users').findOne({ _id: new mongodb.ObjectId(userId) })
//             .then(user => {
//                 //console.log(user);
//                 return user;
//             })
//             .catch(//err => console.log(err)
//             );
//     }

// }

// module.exports = User;


// // Ma'am i didn't receive any mail regarding my end marks . Can you please tell me my marks
// // Roll no. - 6117060 

module.exports = moongoose.model('User', UserSchema);