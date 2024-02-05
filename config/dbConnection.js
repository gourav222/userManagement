import mongoose from "mongoose";
export const dbConnection = async () => {
  const dbUrl = process.env.MONGO_URL || "mongodb://mongo_db:27017/signUpm";
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Success", connection.connection.host);
  } catch (err) {
    console.log(err);
  }
};
