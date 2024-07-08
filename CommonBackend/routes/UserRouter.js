import express from "express";
import { profileHandler } from "../controller/userControler/Profile.js";
import { submissionHandlerbyprob, submissionHandlerbyprobiduserid, submissionHandlerbyuserid } from "../controller/userControler/Submission.js";
import { authorizationJWT } from "../controller/authoController/authorizationJWT.js";
import { authorizationUser } from "../controller/authoController/authorizationUser.js";
const router = express.Router();

router.get("/profile", authorizationJWT, profileHandler);
router.get(
  "/submissions",
  authorizationJWT,
  authorizationUser,
  submissionHandlerbyuserid
);
router.get(
  "/submissions/:prob_id",
  authorizationJWT,
  authorizationUser,
  submissionHandlerbyprobiduserid
);

router.get(
  "/submissions/all/:prob_id",
  authorizationJWT,
  authorizationUser,
  submissionHandlerbyprob
);

export default router;
