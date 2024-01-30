import { config } from "dotenv";
config();
export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;