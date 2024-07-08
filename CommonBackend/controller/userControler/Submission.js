import { ObjectId } from "mongodb";
import Submission from "../../models/Submission.js";
import Problem from "../../models/Problem.js";

export const submissionHandlerbyuserid = async (req, res) => {
  try {
    const user_id = new ObjectId(req.user._id);
    //console.log(user_id);
    const submissions = await Submission.aggregate([
      {
        $match: {
          user_id,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json({
      message: "[RESPONSE SUBMISSION DATA]",
      submissions,
    });
  } catch (error) {
    //console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch Profile",
      error: error.message,
    });
  }
};

export const submissionHandlerbyprobiduserid = async (req, res) => {
  try {
    const user_id = new ObjectId(req.user._id);
    const prob_id = new ObjectId(req.params.prob_id);
    //console.log("HEHEHEHHE")
    const submissions = await Submission.aggregate([
      {
        $match: {
          user_id,
          prob_id,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json({
      message: "[RESPONSE SUBMISSION DATA]",
      submissions,
    });
  } catch (error) {
    //console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch Profile",
      error: error.message,
    });
  }
};

export const submissionHandlerbyprob = async (req, res) => {
  try {
    const prob_id = new ObjectId(req.params.prob_id);
    const submissions = await Submission.aggregate([
      {
        $match: {
          prob_id,
        },
      },
      {
        $sort: {
          execution_time : -1,
        },
      },
    ]);
    return res.status(200).json({
      message: "[RESPONSE SUBMISSION DATA]",
      submissions,
    });
  } catch (error) {
    //console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch Profile",
      error: error.message,
    });
  }
};
