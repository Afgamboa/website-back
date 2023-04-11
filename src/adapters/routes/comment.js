import  authenticateToken  from "../../infrastructure/authenticateToken.js";
import * as Comment from "../controllers/Comment.js";
import  express  from "express";
const router = express.Router();

router.post("/new/:postId", authenticateToken, Comment.createComment);
router.get("/view/:postId", authenticateToken, Comment.getComments);
router.post("/reply/:postId/:commentId", authenticateToken, Comment.replyComment);
router.patch("/comments/:id", authenticateToken, Comment.editComment);
router.delete("/delete/:id", authenticateToken, Comment.deleteComment);

export default router;
