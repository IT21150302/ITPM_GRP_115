// Import required modules
const jwt = require("jsonwebtoken");
const Usermodel = require("../models/user-model");

// Middleware function to protect user routes
exports.protectedUser = async (req, res, next) => {
  let token;
  token = tokenValidate(req); // Validate token from request headers
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token
    const user = await Usermodel.findById(decoded.id); // Find the user based on decoded token
    if (!user) {
      noUserResponse(res); // If user not found, send appropriate response
    } else {
      req.user = user; // Attach user object to request
      next(); // Move to the next middleware
    }
  } catch (err) {
    invalidUserResponse(res, err); // If token is invalid, send appropriate response
  }
};

// Function to validate and extract token from request headers
const tokenValidate = (reqObj, res) => {
  let token;
  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
  }

  if (!token) {
    res.status(401).json({ success: false, desc: "Not Authorized to Access" });
  }
  return token;
};

// Function to handle response when no user is found
const noUserResponse = (res) => {
  res.status(404).json({ success: false, desc: "No user found with this ID" });
};

// Function to handle response when an invalid user is detected
const invalidUserResponse = (res, err) => {
  res
    .status(401)
    .json({ success: false, desc: "Something went wrong, Forbidden - " + err });
};
