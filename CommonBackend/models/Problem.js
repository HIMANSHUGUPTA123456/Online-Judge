import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const tagSchema = new mongoose.Schema({
  value: {
    type: String,
    default: null,
    required: true,
  },
});

const problemSchema = new mongoose.Schema(
  {
    u_id: {
      type: ObjectId,
      default: null,
      required: true,
    },
    title: {
      type: String,
      unique: true,
      default: null,
      required: true,
    },
    difficulty: {
      type: String,
      default: null,
      required: true,
    },
    description: {
      type: String,
      default: null,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    testcasecount: {
      type: Number,
      default: null,
      required: true,
    },
    tags: {
      type: [
        {
          value: String,
        },
      ],
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
