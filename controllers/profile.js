import ProfileModel from "../models/profile.js";// Import your Mongoose model
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt  from "jsonwebtoken";

//create user
export const signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  //creating payload
  const payload = { id: user._id };
  const accessKey = process.env.ACCESS_SECRET_KEY;
  const accessLife = process.env.ACCESS_TOKEN_LIFE;

  const accessToken = jwt.sign(payload, accessKey);
 


      res.status(201).json({
        success:true,
        message: 'User registered successfully',
        accessToken
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //login controller
  export const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await UserModel.findOne({email});
        if(!existingUser){
            return res.status(404).send({
                message: "Invalid details. Plz try again!"
            })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(403).send({
                message: "Invalid details"
            })
        }
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.ACCESS_SECRET_KEY);

        res.status(201).json({
            message: "success",
            token: token,
            user: existingUser
        })
    } catch (err) {
        res.status(500).json({
            message: "failed",
            error: err.message
        })
    }
};

// Create a new user profile
export const createProfile = async (req, res) => {
    try {
        const newProfile = new ProfileModel(req.body);
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
        console.log(savedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile by ID
export const getProfileById = async (req, res) => {
    try {
        const profile = await ProfileModel.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get all user by ID
export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await ProfileModel.find();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile by ID
export const updateProfile = async (req, res) => {
    try {
        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Use $set to update specific fields
            { new: true }
        );
        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete user profile by ID
export const deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await ProfileModel.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
