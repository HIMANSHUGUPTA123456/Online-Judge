import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const tagsSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      default: null,
      required: true,
    },
    problems: {
      type: [String],
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const Tags = mongoose.model("Tags", tagsSchema);
export default Tags;
