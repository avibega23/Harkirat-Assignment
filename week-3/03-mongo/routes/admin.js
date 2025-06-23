const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  const val = await Admin.findOne({ username: username, password: password });
  if (val) {
    res.status(403).json({ msg: "Admin Already Exist" });
    return;
  }
  Admin.create({ username: username, password: password });
  res.json({ msg: "Admin Created Successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const username = req.headers.username;
  const password = req.headers.password;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCourse = await Course.create({
    username: username,
    password: password,
    title: title,
    price: price,
    description: description,
    imageLink: imageLink,
  })
  res.json({ msg: "Course Created Succesfully", id: newCourse._id });
});

router.get("/courses", adminMiddleware,async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({})
  res.json({courses:courses})
});

module.exports = router;
