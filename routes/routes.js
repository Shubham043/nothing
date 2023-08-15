import express from "express";
// import { addConnection, removeConnection } from '../controllers/connection.js';
import {
    createProfile,
    getProfileById,
    getAllProfiles,
    updateProfile,
    deleteProfile,
    signIn,
    signUp,
} from '../controllers/profile.js'

import authMiddleware from "../Middleware/auth.js"

const router = express.Router();

//signUp router
router.post("/signUp",signUp);

//signIN
router.post("/signIn",authMiddleware,signIn)

// Create a new user profile
router.post("/", createProfile);

// Get user profile by ID
router.get("/:id", getProfileById);

//get all profiles
router.get('/',getAllProfiles);

// Update user profile by ID
router.patch("/:id", updateProfile);

// Delete user profile by ID
router.delete("/:id", deleteProfile);



export default router;
