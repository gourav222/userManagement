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
import { sendMessageToKafka } from "../controller/kafkaController.js";
import KafkaConfig from "../kafka/config.js";
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
  console.log("Receive message: ", value);
});
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
