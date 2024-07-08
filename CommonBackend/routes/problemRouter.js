import express from "express";
import { loginUser, refreash, isLogin } from "../controller/authController.js";
import {
  createproblem,
  disableproblem,
  readProblem,
  readProblemall,
  submissionHandlerbyprob,
  updateproblem,
} from "../controller/problemController.js";
import { authorizationAdmin } from "../controller/authoController/authorizationaAdmin.js";
import { authorizationJWT } from "../controller/authoController/authorizationJWT.js";
const router = express.Router();

router.post("/create", authorizationJWT, authorizationAdmin, createproblem);
router.get("/read", authorizationJWT, authorizationAdmin, readProblemall);
router.get("/read/:problemId", authorizationJWT, readProblem);
router.get(
  "/submissions/:problemId",
  authorizationJWT,
  authorizationAdmin,
  submissionHandlerbyprob
);

router.put(
  "/disable/:problemId",
  authorizationJWT,
  authorizationAdmin,
  disableproblem
);
router.put(
  "/update/:problemId",
  authorizationJWT,
  authorizationAdmin,
  updateproblem
);

export default router;
