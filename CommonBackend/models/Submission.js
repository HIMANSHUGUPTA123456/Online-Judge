import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    prob_id: {
      type: ObjectId,
      ref: "Problem",
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    casespassed:{
      type: Number,
      default: 0,
      required: true,
    },
    code_ref: {
      type: String,
      default: null,
      required: true,
    },
    verdict: {
      type: Boolean,
      required: true,
      default: false,
    },
    comment: {
      type: String,
      default: null,
    },
    execution_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
