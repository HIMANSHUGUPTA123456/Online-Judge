import Submission from "../../models/Submission.js";
import Testcase from "../../models/Testcase.js";
import { generateFile } from "./CompilerFunctions.js";
import { executeCheck } from "./SubmissionFunctions.js";
const storeSubmission = async (
  prob_id,
  code_ref,
  language,
  verdict,
  comment,
  user_id,
  execution_time,
  casespassed = 0
) => {
  const submission = await Submission.create({
    prob_id,
    code_ref,
    language,
    verdict,
    comment,
    user_id,
    execution_time,
    casespassed,
  });
  return submission;
};
export const submission = async (req, res) => {
  const user_id = req.user._id;
  const { prob_id, lang = "cpp", code } = req.body;
  if (!code) {
    return res.status(400).send({
      success: false,
      message: "No Code",
      error: { status: 4 }, //E4
    });
  }

  const filepath = generateFile(lang, code);

  const testcases = await Testcase.find({ problem_id: prob_id });
  //console.log(filepath, "[INTPUJT]:", testcases);
  try {
    const { casespassed, exeTime } = await executeCheck(
      filepath,
      lang,
      testcases
    );
    //console.log(exeTime);
    const submission = await storeSubmission(
      prob_id,
      filepath,
      lang,
      true,
      "ALL PASSED",
      user_id,
      exeTime,
      casespassed
    );
    return res.status(200).json({
      success: true,
      message: "[Successful]",
      submission,
    });
  } catch (err) {
    if (err.status == 0) {
      const submission = await storeSubmission(
        prob_id,
        filepath,
        lang,
        false,
        err.error.message,
        user_id,
        0,
        err.error.casespassed
      );
      return res.status(400).send({
        success: false,
        message: "TLE",
        error: err,
        submission,
      });
    }
    if (err.status == 1) {
      const submission = await storeSubmission(
        prob_id,
        filepath,
        lang,
        false,
        "Compilation Error",
        user_id,
        0,
        0
      );
      return res.status(400).send({
        success: false,
        message: "Compilation Failed",
        error: err,
        submission,
      });
    }
    if (err.status == 2) {
      const submission = await storeSubmission(
        prob_id,
        filepath,
        lang,
        false,
        err.error.message,
        user_id,
        0,
        err.error.casespassed
      );
      return res.status(400).send({
        success: false,
        message: "Test Case Failed",
        error: err,
        submission,
      });
    }
    return res.status(500).send({
      success: false,
      message: "[Internal Server Error]",
      error: err.message,
    });
  }
};
