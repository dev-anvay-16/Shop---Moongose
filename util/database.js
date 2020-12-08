const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let __db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://anvay16:condensed@shop.tbyec.mongodb.net/Shop?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
        console.log("connected");
        __db = client.db();
        callback(__db);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}
 
const getDb = () => {
    if (__db) {
        return __db;
    }
    throw 'No Database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

