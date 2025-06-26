const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");


// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.create({ username: username, password: password });
  res.json({ msg: "Admin Created Succesfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;
  const user = await Admin.findOne({username,password });
  if (user) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({
      token,
    });
  }
  else
  {
    res.status(411).json({msg:"Incorrect Email And Pass"})
  }
});

router.post("/courses", adminMiddleware, (req, res) => {
   // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
