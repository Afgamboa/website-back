import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import * as User from "../controllers/User.js";


const router = express.Router();

router.get("/users", authenticateToken, User.getAllUsers);
router.get("/users/:id", authenticateToken, User.getUserById);
router.patch("/users/:id", authenticateToken, User.updateUserById);
router.delete("/users/:id", authenticateToken, User.deleteUserById);