import mongoose from "mongoose";
import * as argon2 from "argon2";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        
        required: function () {
            // Only required for non-Google users initially
            return !this.googleId;
        },
    },
    lastName: {
        type: String,
    },
    /* mobile: {
         type: String,
         required: true,
     },*/
    mobile: {
        type: String,
        required: function () {
            // Only required for non-Google users
            return !this.googleId;
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    /* password: {
         type: String,
         required: true,
     },*/
    password: {
        type: String,
        // Only required for users NOT using Google auth
        required: function () {
            return !this.googleId;
        },
    },
    /*address: {
        type: String,
        required: true,
    },*/
    address: {
        type: String,
        required: function () {
            // Only required for non-Google users initially
            return !this.googleId;
        },
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    region: {
        type: String,
    },
    /* zipCode: {
         type: String,
         required: true,
     },*/
    zipCode: {
        type: String,
        required: function () {
            // Only required for non-Google users initially
            return this.googleId ? false : true;
        },
    },

    country: {
        type: String,
    },
    miscInfo: {
        type: String,
    },

    // New fields for Google authentication
    googleId: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false, // Regular users start unverified
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

// hashing middleware
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next()

    try {
        this.password = await argon2.hash(this.password)
        next()
    } catch (error) {
        return next(error)
    }
});

// Add a helper method to check password
userSchema.methods.verifyPassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await argon2.verify(this.password, candidatePassword);
};


const User = mongoose.model("User", userSchema);

export default User;