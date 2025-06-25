const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.create({ username: username, passowrd: password });
  res.json({msg:"Admin Created Succesfully"})
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
