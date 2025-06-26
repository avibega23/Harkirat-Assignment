// Middleware for handling auth
const jwt = require("jsonwebtoken");
const secret = require("../index");
const { Admin } = require("../db/index");
const JWT_SECRET = require("../index");
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const word = token.split(" ");
  const jwtKey = word[1];
  const decoded = jwt.verify(jwtKey, JWT_SECRET);
  if (decoded.username) {
    next();
  } else {
    res.status(403).json({ msg: "You are not authenticated" } );
  }
}

module.exports = adminMiddleware;
