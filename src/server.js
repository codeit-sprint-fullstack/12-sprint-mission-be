import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "../db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
