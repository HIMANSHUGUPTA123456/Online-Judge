import jwt from "jsonwebtoken";
import { refreash } from "./refreash.js";

export const authorizationJWT = async (req, res, next) => {
  //console.log("[PROCEEDED authorizationJWT]");
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            refreash(req, res, next);
          }
          //
          //FORWARD IF ACCESSTOKEN IS VALID AND EXISTS
          //
          req.user = user.userdata;
          next();
        }
      );
    } else {
      //console.log("[NOT EXISTS authorizationJWT]");
      refreash(req, res, next);
    }
  } else {
    res.status(403).json({ isAuthenticated: false });
  }
};
