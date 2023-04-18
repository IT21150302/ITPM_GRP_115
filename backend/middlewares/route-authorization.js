const jwt = require("jsonwebtoken");
const Usermodel = require("../models/user-model");


exports.protectedUser = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usermodel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};