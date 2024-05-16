const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Week } = require("../db");
const nodemailer = require("nodemailer");
const router = express.Router();
const JWT_SECRET = "course";

router.post("/addweek", async function (req, res) {
  try {
    const weekname = req.body.weekname;
    const assignment = req.body.assignment;
    const lectureNotes = req.body.lectureNotes;
    const videoLecture = req.body.videoLecture;
    const uppweekname = weekname.toLowerCase();
    const isWeek = await Week.findOne({
      weekname: weekname,
    });
    if (isWeek) {
      return res.status(403).json({ msg: "Week Already Created" });
    }
    const weekres = await Week.create({
      weekname: uppweekname,
      assignment: assignment,
      lectureNotes: lectureNotes,
      videoLecture: videoLecture,
    });
    res.status(200).json({ msg: "Week Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/deleteWeek", async function (req, res) {
  try {
    const weekname = req.body.weekname;
    const isWeek = await Week.findOne({
      weekname: weekname,
    });
    if (!isWeek) {
      return res.status(403).json({ msg: "This Week is not found" });
    }
    await Week.deleteOne({ _id: isWeek._id });
    res.status(200).json({ msg: "Week Deleted Succesffuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
