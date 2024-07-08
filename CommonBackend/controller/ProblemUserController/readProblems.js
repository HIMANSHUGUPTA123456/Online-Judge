import Problem from "../../models/Problem.js";
export const readproblems = async (req, res) => {
  try {
    const counttag = req.body.page;
    if (!counttag) {
      return res.status(404).json({
        message: "[no Page number given]",
        success: false,
      });
    }
    const skip = (counttag - 1) * 4;
    const problems = await Problem.find(
      { active: true },
      { _id: 1, difficulty: 1, active: 1, title: 1, tags: 1 }
    )
      .skip(skip)
      .limit(4);
    return res.status(200).json({
      success: true,
      message: "[RESPONSE PROBLEMS]",
      problems: problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      success: false,
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};
