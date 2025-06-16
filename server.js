import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import Contact from "./models/ContactModel.js";

dotenv.config();
const app = express();
const upload = multer();
app.use(upload.none());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// POST route
app.post("/contact", async (req, res) => {
  const { username, email, message } = req.body;

  try {
    const contact = new Contact({ username, email, message });
    await contact.save();
    res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
