import express from "express";
import {
  registerUser,
  loginUser,
  resetVerify,
  resetPassword,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/resetLink").post(resetVerify);
router.route("/resetPasword/:id").post(resetPassword);
router.route("/getusers").get(getAllUsers);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/getUser/:id").get(getUser);
router.route("/editUser/:id").patch(editUser);

export default router;
