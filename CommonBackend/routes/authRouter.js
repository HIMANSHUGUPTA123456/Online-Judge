import express from "express";
import {
  registerUser,
  loginUser,
  refreash,
  isLogin,
  logoutUser,
} from "../controller/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/islogin", isLogin);
router.get("/refresh", refreash);
router.get("/logout", logoutUser);
export default router;
