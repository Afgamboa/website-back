import express from "express";
import  authenticateToken  from "../../infrastructure/authenticateToken.js";
import * as Post from "../controllers/Post.js";

const router = express.Router();

router.post("/new", authenticateToken, Post.createPost);
router.get("/view", authenticateToken, Post.getPosts);
router.get("/view/:id", authenticateToken, Post.getPostById);
router.patch("/edit/:id", authenticateToken, Post.updatePost);
router.delete("/delete/:id", authenticateToken, Post.deletePost);



export default router;
