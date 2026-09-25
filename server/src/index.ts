import express from "express";
import { pool } from "./db.js";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);


app.get("/", (req, res) => {
  res.send("Craftsman Marketplace API is running!");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, dbTime: result.rows[0].now });
  } catch (error) {
    console.error("database connection error:", error);
    res.status(500).json({ error: "database connection failed" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
