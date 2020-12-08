const moongoose = require('mongoose');
const Schema = moongoose.Schema;
const OrderSchema = new Schema({
    user: {
        name: {
        type: String,
        required:true
        },
        email: {
        type: String,
        required:true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref : 'User'
        }
    },
    date: {
        type: String,
        required:true
    },
    products: [
        {
            product: {
                title:{
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
                _id: {
                    type: Schema.Types.ObjectId,
                    required : true
                }
            },
            quantity: {
                type: Number,
                required : true
            }
        }
    ]
    
});

module.exports = moongoose.model('Order', OrderSchema);