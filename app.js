import express from "express";
import userRoute from "./routes/userRoutes.js";
import productRoute from './routes/productRoutes.js';

const app = express();
app.use(express.json());
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);

export default app;
