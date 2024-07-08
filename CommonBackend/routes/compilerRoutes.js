import express from "express";
import { compiler } from "../controller/compilerControler/compilerControler.js";
import { submission } from "../controller/compilerControler/submissionControler.js";
import { authorizationJWT } from "../controller/authoController/authorizationJWT.js";
import { authorizationUser } from "../controller/authoController/authorizationUser.js";

const router = express.Router();
router.post("/run", authorizationJWT, authorizationUser, compiler);
router.post("/submit", authorizationJWT, authorizationUser, submission);

export default router;
