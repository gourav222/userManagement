import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Success", connection.connection.host);
  } catch (err) {
    console.log(err);
  }
};
