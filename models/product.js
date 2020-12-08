// const mongoDb = require('mongodb');
// const getDb = require('../util/database').getDb;

const moongoose = require('mongoose');
const Schema = moongoose.Schema;
const ProductSchema = new Schema({
   title:{
      type: String,
      required : true
   },
   year:{
      type: String,
      required : true
   },
   description:{
      type: String,
      required : true
   },
   imageUrl:{
      type: String,
      required : true
   },
   price: {
      type: Number,
      required : true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref : 'User'
   }
})

// class Product {

//    constructor(details,userId) {
//       this.details = details;
//       this._id = details.prodId;
//       this.userId = userId;
//    }

//    save() {
//       this.prop = {
//          title: this.details.prodName,
//          description: this.details.prodDescription,
//          imageUrl: this.details.prodImageUrl,
//          price: this.details.prodPrice,
//          year: this.details.prodSeason,
//          userId: this.userId
        
//       };
//       const db = getDb();
//       let dbOp;
//       if (this._id) {
//          dbOp = db.collection('All Data').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this.prop });
//       }
//       else {
//          dbOp = db.collection('All Data').insertOne({ ...this.prop });
//       }
//       return  dbOp.then(
//          // result => {
//          //    console.log('hey' , result);})
//          // .catch(
         
//          );
//    }

//    static fetchAll(products) {
//       const db = getDb();
//       return db.collection('All Data').find().toArray()
//          .then(product => {
//             //console.log(products);
//             products(product);
//          })
//          .catch(err => {
//             console.log(err);
//       })
//    }

//    static findById(id) {
//       const db = getDb();
//       return db.collection('All Data').find({ _id: new mongoDb.ObjectId(id) })
//          .next()
//          .then(product => {
//             console.log(product);
//             return product;
//          })
//          .catch(err => {
//             console.log(err);
//       })
//    }

//    static delete(id) {
//       const db = getDb();
//       return db.collection('All Data').deleteOne({ _id : new mongoDb.ObjectId(id) });
//    }

// };

module.exports = moongoose.model('Product', ProductSchema);


