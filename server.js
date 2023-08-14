import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js"; 
import cors from 'cors';
// import connectionRoutes from "./routes/connection.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
// Database connection
const URI = 'mongodb+srv://rawanshubham:12344321@cluster0.dlb2ty9.mongodb.net/your-database-name?retryWrites=true&w=majority';
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


app.use(express.json());

app.use("/api/profiles", router); 
// app.use("/api/connection",connectionRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

