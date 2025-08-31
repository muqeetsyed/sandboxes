import {verifyToken} from "./jwt.js";
import User from "../modules/user.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);

        if (!user instanceof User) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Attach user to the request
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};