import express from "express";
import {
  readproblem,
  readproblems,
  readproblemsbytag,
  readtags,
} from "../controller/ProblemUserController/index.js";
const router = express.Router();

router.post("/read", readproblems);
router.get("/read/:id", readproblem);
router.get("/get/tags", readtags);
router.post("/read/tags", readproblemsbytag);

export default router;
