import product from "../models/productModes.js";

export const createItems = async (req, res) => {
  try {
    const addProduct = await product.create(req.body);
    res.status(201).json({
      message: "Product added successfully",
      product: addProduct,
    });
  } catch (err) {
    console.log("Adding product is failed", err);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const allProducts = await product.find();
    res.status(201).json({
      message: "All products",
      allProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: "Bad Request",
    });
  }
};
export const deleteItem = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Item successfully deleted",
      deletedProduct,
    });
  } catch (err) {
    res.status(401).json({
      message: "Request Not Found",
    });
  }
};
export const updateItems = async (req, res) => {
  try {
    const newProduct = await product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Product updated successfully",
      newProduct,
    });
  } catch (err) {
    res.status(401).json({
      message: "Request Not Found",
    });
  }
};
