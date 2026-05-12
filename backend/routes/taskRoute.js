import express from "express";
import { addTask, getTasks, deleteTask, updateTask } from "../controllers/taskController.js";
import { login,  } from "../controllers/authController.js";
import Signup from "../controllers/signupController.js";
import authMiddleware from "./authmidddleware.js";
const router = express.Router();

router.post("/",authMiddleware, addTask);
router.get("/",authMiddleware, getTasks);
router.delete("/:id",authMiddleware, deleteTask);
router.put("/:id",authMiddleware, updateTask);


export default router;