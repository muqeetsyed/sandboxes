import express from "express";
import passport from "passport";

const router = express.Router();

// Google OAuth login route
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        // Successful authentication, redirect to dashboard
        res.redirect('/dashboard');
    }
);

// Get current user info
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                profilePicture: req.user.profilePicture
            }
        });
    }

    res.status(401).json({
        success: false,
        message: 'Not authenticated'
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

export default router;
