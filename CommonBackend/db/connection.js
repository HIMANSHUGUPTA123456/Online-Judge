import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGO_DB_URL;
  try {
    console.log(MONGO_URI)
    await mongoose.connect(MONGO_URI);
    console.log("Database Connected");
  } catch (err) {
    console.log("[MONGO CONNECTION ERROR]", err);
  }
};
export default DBConnection;
