import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

export const generateToken = (payload) => {
    const secretKey = process.env.JWT_SECRET;
    const options = {
        'expiresIn': '1h'
    }

    return jwt.sign(payload, secretKey, options);
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}