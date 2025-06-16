import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import Contact from "./models/ContactModel.js";

dotenv.config();
const app = express();
const upload = multer(); // initialize multer

// Middleware
app.use(upload.none()); // This handles multipart/form-data from FormData
app.use(express.static("public"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Contact route
app.post("/contact", async (req, res) => {
  const { username, email, message } = req.body; // ✅ Now this will work

  try {
    const newContact = new Contact({ username, email, message });
    await newContact.save();
    res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
const PORT = process.env.PORT || 5000;

// Server start
// app.listen(5000, () => console.log("Server is running on port 5000"));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
