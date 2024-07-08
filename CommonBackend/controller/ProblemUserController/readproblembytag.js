import mongoose from "mongoose";
import Problem from "../../models/Problem.js";
import Tags from "../../models/Tags.js";
import { readproblems } from "./readProblems.js";
export const readproblemsbytag = async (req, res) => {
  try {
    const tagIds = req.body.tags;
    if (!tagIds || tagIds.length === 0) {
      return await readproblems(req, res);
    }
    //console.log(typeof tagIds, tagIds);
    const objectIds = await Promise.all(
      tagIds.map(async (id) => {
        return new mongoose.Types.ObjectId(id._id);
      })
    );

    const tags = await Tags.find({
      _id: { $in: objectIds },
    });
    //console.log(tags);
    const problemIds = [
      ...new Set(
        tags.flatMap((tag) =>
          tag.problems.map((id) => new mongoose.Types.ObjectId(id))
        )
      ),
    ];
    const problems = await Problem.find(
      {
        _id: { $in: problemIds },
        active: true,
      },
      { _id: 1, difficulty: 1, active: 1, title: 1, tags: 1 }
    );
    // Send the response with the fetched problems
    res.status(200).json({
      success: true,
      problems: problems,
    });
  } catch (error) {
    console.error("Error fetching problems by tags:", error);
    return res.status(500).json({
      success: false,
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};
