import { register, otp, login, logout } from "../controllers/auth.js";
import express from "express"
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
//REGISTER
router.post("/register", register);
//LOGIN
router.post("/otp", otp);
router.post("/login", login);
//LOGOUT
router.post("/logout", verifyToken, logout);

export default router;