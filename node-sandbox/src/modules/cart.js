import mongoose, {mongo} from "mongoose";

const { Schema } = mongoose;


// id
// product  fk   1-n
// totalItems
// price
// user  fk     1-1

const cartSchema = new Schema({
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1, // Default quantity
                min: 1
            }
        }
    ],
    totalItems: {
        type: Number,
        default: 1
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;