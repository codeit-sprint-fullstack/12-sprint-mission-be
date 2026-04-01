import mongoose from "mongoose";
import config from "./config/config.js";

async function connectDB() {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log("MongoDB 연결 성공");
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    process.exit(1);
  }
}

export default connectDB;
