import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
