import express from "express";
import { login,  } from "../controllers/authController.js";
import signup from "../controllers/signupController.js";

const router = express.Router()

router.post("/login",login)
router.post("/signup",signup)
export default router

