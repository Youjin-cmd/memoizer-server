import mongoose from "mongoose";
import CONFIG from "../constants/config";

async function mongooseLoader() {
  try {
    await mongoose.connect(CONFIG.MONGODB_URL, { dbName: "memoizer" });
    console.log("connected to database");
  } catch (error) {
    console.error(error);
  }
}

export default mongooseLoader;
