import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoute.js';  // Import the router
import userRoutes from './routes/userRoute.js';  // Import the router
import cartRoutes from './routes/cartRoute.js';  // Import the router
import authRoutes from './routes/authRoute.js';  // Import the router
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import "../config/passport.js"; // Add this line to import the passport configuration


// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(express.json());
app.use(cors());

export var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 24, // 1 day  1000 * 60 * 60 *
        secure: process.env.NODE_ENV === 'production'
    }
}));

// Database Connection with retries
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000
            }
        );
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('🚫 MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};


// Passport initialization - must come after session setup
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/carts", cartRoutes)

// Routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send(`<h1>Welcome, ${req.user.name}</h1><a href="/api/auth/logout">Logout</a>`);
    }
    res.redirect('/api/users');
});

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/api/auth/google">Sign in with Google</a>');
});


// Start Server
const startServer = () => {
    app.listen(PORT, '0.0.0.0', () => {  // Crucial 0.0.0.0 binding
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

// Init sequence
(async () => {
    await connectDB();
    startServer();
})();