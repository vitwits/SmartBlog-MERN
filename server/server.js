import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("What's up?");
});

app.listen(PORT, () => {
  console.log(`Express app listens on port ${PORT}`);
});

export default app;
