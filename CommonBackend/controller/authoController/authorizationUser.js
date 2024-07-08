export const authorizationUser = async (req, res, next) => {
  //console.log("[PROCEEDED authorizationUser]");
  try {
    //console.log(req.user);
    if (req.user.isAdmin == false) next();
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
