import express from "express";
import { login }  from "../controllers/Auth.js";
import { getUserById } from '../controllers/Auth.js';

const router = express.Router();


router.post('/login', login);
router.get('/:id', getUserById);

export default router;
