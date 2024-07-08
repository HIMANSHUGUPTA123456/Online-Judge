import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema(
  {
    problem_id: {
      type: ObjectId,
      default: null,
      required: true,
    },
    testin: {
      type: String,
      default: null,
      required: true,
    },
    testout: {
      type: String,
      default: null,
      required: true,
    },
    visible: {
      type: Boolean,
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const Testcase = mongoose.model("Testcase", testcaseSchema);
export default Testcase;
