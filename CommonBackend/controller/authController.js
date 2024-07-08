import User from "../models/User.js";
import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    //1. Check all parameters there
    const { fname, lname, email, password, username, isAdmin } = req.body;
    if (!fname || !lname || !email || !password || !username || !isAdmin) {
      return res.status(400).send("[Some Info Missing]");
    }
    //2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //3. Create User
    const user = await User.create({
      username,
      fname,
      lname,
      email,
      isAdmin: isAdmin == "T" ? true : false,
    });
    const key = await Auth.create({
      u_id: user._id,
      password: hashedPassword,
    });
    //console.log("[User Saved]", user, key);

    //4. Response User
    const resUser = {
      message: "User Created",
      user: user._doc,
    };
    res.status(200).send(resUser);
  } catch (err) {
    console.log("[ERROR IN SAVING DATA]", err);
    if (err.code == 11000)
      if (err.keyPattern["email"] !== undefined)
        return res.status(400).send({ message: "[USER EXISTS]", on: "email" });
      else if (err.keyPattern["username"] !== undefined)
        return res
          .status(400)
          .send({ message: "[USER EXISTS]", on: "username" });
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};

export const loginUser = async (req, res) => {
  try {
    //1. Check all parameters there
    const { password, username } = req.body;
    if (!username || !password) {
      return res.status(400).send("[Some Info Missing]");
    }

    //2. Check if User is there
    const userdata = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (!userdata) {
      return res.status(404).send("NO USER FOUND");
    }
    //3. Check if Password valid is there
    const key = await Auth.findOne({
      u_id: userdata._id,
    });
    const validPassword = await bcrypt.compare(password, key.password);
    if (!validPassword) {
      return res.status(404).send("WRONG PASSWORD");
    }

    //4. Generatet JWT acceess refreash and send to user
    const accesstoken = jwt.sign(
      { userdata },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h", //"1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: userdata._id, isAdmin: userdata.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const resUser = {
      message: "User Logged In",
      user: userdata._doc,
      accesstoken,
      refreshToken,
    };
    //5.creating cokie for response
    const accessTokenOptions = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };

    const refreshTokenOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accesstoken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json(resUser);
  } catch (err) {
    //console.log(err);
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};

export const refreash = async (req, res) => {
  try {
    //1. Take token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .send({ isAuthenticated: false, message: "Refresh token missing" });
    }
    //2. Verify token
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .send({ isAuthenticated: false, message: "Invalid refresh token" });
      }
      //3. Generate and send new token
      const storedUser = await User.findById(user.id);
      const newAccessToken = jwt.sign(
        { storedUser },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const accessTokenOptions = {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      res.cookie("accessToken", newAccessToken, accessTokenOptions).json({
        message: "Access token refreshed",
        accessToken: newAccessToken,
      });
    });
  } catch (err) {
    //console.log(err);
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};

export const isLogin = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          return res.json({ isAuthenticated: false, err });
        }
        //console.log(user);
        return res.json({ isAuthenticated: true, user });
      }
    );
  } else {
    res.json({ isAuthenticated: false });
  }
};

export const logoutUser = (req, res) => {
  try {
    const newAccessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1ms", // 1 hour
    });
    const accessTokenOptions = {
      expires: new Date(Date.now() - 2 * 60 * 60 * 1000), // Expires 1 hour ago
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res.cookie("accessToken", newAccessToken, accessTokenOptions);
    const newRefreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1ms",
    });
    const refreshTokenOptions = {
      expires: new Date(Date.now() - 2 * 60 * 60 * 1000), // Expires 1 hour ago
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error logging out:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};
