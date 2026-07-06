import express from "express";
import setResource from "../../middleware/resource.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import * as userController from "./user.controller.js";

const router = express.Router();

router.use(setResource("유저"));

router.get("/me", requireAuth, userController.getMe);

export default router;
