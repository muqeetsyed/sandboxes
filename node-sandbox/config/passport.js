// config/passport.js
import passport from "passport";
import User from "../src/modules/user.js";

import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

// Google OAuth strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        try {


            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("Profile:", profile);

            // Check if user already exists
            let user = await User.findOne({googleId: profile.id});

            if (user) {
                // User exists, return the user
                return done(null, user);
            }

            // Create new user if doesn't exist
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                profilePicture: profile.photos[0].value,
                isVerified: true  // Google users are automatically verified
            });

            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;