export const authorizationAdmin = async (req, res, next) => {
  //console.log("[PROCEEDED authorizationAdmin]");
  try {
    //console.log(req.user);
    if (req.user.isAdmin == true) next();
    else {
      return res.status(403).send({
        message: "[NOT AUTHORISED]",
        isAuthenticated: true,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};
