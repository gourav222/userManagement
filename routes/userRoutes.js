import express from "express";
import { registerUser, loginUser,resetVerify,resetPassword } from "../controller/userController.js";

const router = express.Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/resetLink").post(resetVerify);
router.route("/resetPasword/:id").post(resetPassword);

export default router;
