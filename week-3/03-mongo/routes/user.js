const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");
const mongoose = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  const val = await User.findOne({ username: username, password: password });
  if (val) {
    res.status(403).json({ msg: "Admin Already Exist" });
    return;
  }
  User.create({ username: username, password: password });
  res.json({ msg: "User Created Successfully" });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json({ courses: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers.username;
  const id = req.params.courseId;

  await User.updateOne(
    { username: username },
    { $push: { purchasedCourses: id } }
  )
  res.json({ msg: "purchase complete" });
});

router.get("/purchasedCourses", userMiddleware,async (req, res) => {
  // Implement fetching purchased courses logic
  const username =  req.headers.username;
  const user = await User.findOne({username:username})
  const arr = user.purchasedCourses
  list = []
  for(let i = 0;i<arr.length;i++)
  {
    const course = await Course.findById(arr[i])
    list.push(course)
  }
  res.json({courses:list})
});

module.exports = router;
