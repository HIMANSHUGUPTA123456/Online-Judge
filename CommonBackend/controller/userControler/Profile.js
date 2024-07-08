import { ObjectId } from "mongodb";
import Submission from "../../models/Submission.js";
import Problem from "../../models/Problem.js";

export const profileHandler = async (req, res) => {
  try {
    //console.log("[USER DATA]", req.user);
    const user = {
      username: req.user.username,
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
      createdAt: req.user.createdAt,
    };
    const user_id = new ObjectId(req.user._id);
    //console.log(user_id);
    const problemarr = await Submission.find({ user_id }).distinct("prob_id");
    const problem = await Problem.find(
      { _id: { $in: problemarr } },
      { title: 1, difficulty: 1 }
    );
    return res.status(200).json({
      message: "[RESPONSE USER DATA]",
      user,
      problem,
    });
  } catch (error) {
    //console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch Profile",
      error: error.message,
    });
  }
};
