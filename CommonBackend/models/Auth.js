import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    u_id: {
      type: ObjectId,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
