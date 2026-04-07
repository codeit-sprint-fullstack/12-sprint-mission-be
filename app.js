import express from "express";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./db.js";
import productsRoutes from "./src/routes/productsRoutes.js";

// MongoDB 연결
connectDB();

// Express 앱 생성
const app = express();
const PORT = config.server.port || 3000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://one2-sprint-mission-be-zfc3.onrender.com",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

// const asyncHandler = (handler) => {
//   return async (req, res) => {
//     try {
//       await handler(req, res);
//     } catch (error) {
//       if (error.name === "ValidationError") {
//         res.status(400).json({
//           success: false,
//           message: error.message,
//         });
//       } else if (error.name === "CastError") {
//         res
//           .status(404)
//           .json({ success: false, message: "Cannot find given id." });
//       } else {
//         res.status(500).json({ success: false, message: error.message });
//       }
//     }
//   };
// };

app.use("/api/products", productsRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
