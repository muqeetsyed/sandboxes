import express from "express";
import {authenticateUser} from "../utils/userAuthentication.js";
import Cart from "../modules/cart.js";
import Product from "../modules/product.js";

const router = express.Router();

router.post('/add', authenticateUser, async (req, res) => {
    const {product, quantity} = req.body;
    const user = req.user;

    const existingProduct = await Product.findById(product);

    let cart = await Cart.findOne({user});

    if(cart instanceof Cart) {
        const indexOfExistingProduct = cart.items.findIndex(item => item.product._id == product);

        if(indexOfExistingProduct !== -1) {
            cart.items[indexOfExistingProduct].quantity += quantity;
        }else {
            cart.items.push({
                product: existingProduct,
                quantity
            })
        }
    }else{
         cart = new Cart({
            user: user,
            items: [
                {
                    product: existingProduct,
                    quantity
                }
            ]
        });
    }

    await cart.save();

    return res.status(200).json({"saved": "Record saved successfully"})
});


router.get('/', authenticateUser, async (req, res) => {
    const loggedInUser = req.user;

    const cart = Cart.where({user: loggedInUser});

    const cartFound = await cart.findOne();

    return res.status(200).json({"details": cartFound})
});

router.delete('/remove/:productId', authenticateUser, async (req, res) => {
    const user = req.user;
    const {productId} = req.params;

    let cart = await Cart.findOne({user});

    if(cart instanceof Cart) {
        cart.items = cart.items.filter(item => item.product._id != productId)
        await cart.save();

        return res.status(200).json("Cart Item removed successfully")
    }else{
        return res.status(200).json("Invalid Cart Item")
    }
});



export default router;