import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  CLIENT_URL: process.env.CLIENT_URL,
  MONGODB_URL: process.env.MONGODB_URL,
};

export default CONFIG;
