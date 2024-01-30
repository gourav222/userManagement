import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the valid title"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the valid price"],
  },
  description: {
    type: String,
    required: [true, "Please enter the valid description"],
  },
  category: {
    type: String,
    required: [true, "Please enter the valid category"],
  },
  image: {
    type: [],
    // required: [true, "Please enter the valid image"],
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
      //   required: [true, "Please enter the valid rating"],
    },
    count: {
      type: Number,
      default: 0,
      //   required: [true, "Please enter the valid count"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const product = mongoose.model("Product", productSchema);

export default product;
