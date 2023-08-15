import mongoose from "mongoose";
import UserModel from "./user.js";
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Your Name",
        required:true
    },
    email: {
        type: String,
        default: "youremail@example.com",
        required:true
    },
    connection:{
        type:bool,
        default:false
    },
    phoneNumber: {
        type: String,
        default: "9999999999",
    },
    about: {
        type: String,
        default: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    },
    skills: {
        type: [String],
        default: ["C++", "JavaScript"],
    },
    certificates: [
        {
            title: {
                type: String,
                default: "Certificate Title",
            },
            image: {
                type: String,
                default: "default-certificate-image-url.jpg",
            },
        },
    ],
    experience: [
        {
            title: {
                type: String,
                default: "Experience Title",
            },
            company: {
                type: String,
                default: "Company Name",
            },
        },
    ],
    education: {
        type: String,
        default: "Education Details",
    },
});

const ProfileModel = mongoose.model("Profile", profileSchema);

export default ProfileModel;
