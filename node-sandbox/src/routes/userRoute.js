import express from 'express';
import User from '../modules/user.js';
import { generateToken } from "../utils/jwt.js";
import * as argon2 from "argon2";
import cors from "cors";
import {corsOptions} from "../index.js";
import UserRepository from "../repositories/UserRepository.js";
import * as util from "node:util";
import UserService from "../services/UserService.js";

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
    try {
        const userService = new UserService(new UserRepository());
        const users = await userService.getUsers();

        res.json(users)
    } catch (err) {
        res.status(500).send("Server error")
    }
})


// Create new user
router.post("/create", cors(corsOptions), async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            mobile,
            email,
            password,
            address,
            address2,
            city,
            region,
            zipCode,
            country,
            miscInfo
        } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser instanceof User) {
            return res.status(400).json({ error: "User already exists" })
        }

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            password: password,
            address: address,
            address2: address2,
            city: city,
            region: region,
            zipCode: zipCode,
            country: country,
            miscInfo: miscInfo
        });

        await newUser.save();

        const token = generateToken({ userId: newUser._id });

        res.status(201).json(token)
    } catch (err) {
        res.status(500).send(err)
    }
})


// login user
router.get('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const existingUser = await User.findOne({ email });

        if (!existingUser instanceof User) {
            return res.status(400).json({error: "User does not exists"})
        }

        const isMatch = await argon2.verify(existingUser.password, password)

        if(!isMatch) {
            return res.status(400).json({error: "Password does not match"})
        }

        const token = generateToken({ userId: existingUser._id });

        res.json({ token })
    }catch (err) {
        res.status(500).send(err)
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user instanceof User) {
            await user.deleteOne();

            return res.status(200).json("User deleted successfully!")
        }

        return res.status(404).json({msg: "User not found"})
    } catch (e) {
        res.status(500).send(e)
    }
});


// Export the router
export default router;
