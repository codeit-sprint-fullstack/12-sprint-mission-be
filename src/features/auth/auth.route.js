import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import * as authController from "./auth.controller.js";

const router = express.Router();

router.use(setResource("유저"));

router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
