import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

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

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Express app listens on port ${PORT}`);
});

export default app;
