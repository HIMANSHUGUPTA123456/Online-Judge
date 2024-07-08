import User from "../../models/User.js";
import jwt from "jsonwebtoken";

export const refreash = async (req, res, next) => {
  //console.log("[PROCEEDED refreash]");
  try {
    //1. Take token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .send({ isAuthenticated: false, message: "Refresh token missing" });
    }
    //2. Verify token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          return res
            .status(403)
            .send({ isAuthenticated: false, message: "Invalid refresh token" });
        }
        //3. Generate and send new token
        const userdata = await User.findById(user.id);
        const newAccessToken = jwt.sign(
          { userdata },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const accessTokenOptions = {
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
          httpOnly: true,
          sameSite: "None",
          secure: true,
        };
        res.cookie("accessToken", newAccessToken, accessTokenOptions);
        req.user = userdata;
        next();
      }
    );
  } catch (err) {
    //console.log(err);
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};
