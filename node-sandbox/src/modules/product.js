import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
}, {
    statics: {
        findByName(name) {
            return this.find({ name: name });
        }
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;