import Problem from "../../models/Problem.js";
import Testcase from "../../models/Testcase.js";
export const readproblem = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(id);
    if (!id) {
      return res.status(404).json({
        message: "[no id given]",
        success: false,
      });
    }
    const problem = await Problem.findById(id);
    const testcases = await Testcase.find({
      problem_id: id,
      visible: true,
    });
    return res.status(200).json({
      success: true,
      message: "[RESPONSE PROBLEMS]",
      problem,
      testcases,
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
