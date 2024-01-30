import express from "express";
import {
  createItems,
  getAllItems,
  updateItems,
  deleteItem,
} from "../controller/productController.js";

const router = express.Router();

router.route("/createProduct").post(createItems);
router.route("/getAllProducts").get(getAllItems);
router.route("/updateProduct/:id").patch(updateItems);
router.route("/deleteProduct/:id").delete(deleteItem);

export default router;
