import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  CLIENT_URL: process.env.CLIENT_URL,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRETKEY: process.env.SECRETKEY,
  ONE_HOUR_IN_MS: 1000 * 60 * 60,
};

export default CONFIG;
