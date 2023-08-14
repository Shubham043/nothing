
import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
