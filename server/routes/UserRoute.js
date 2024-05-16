const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Week } = require("../db");
const nodemailer = require("nodemailer");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
//signUp
router.post("/signUp", async function (req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userexits = await User.findOne({ email: sanitizedEmail });
    if (userexits) {
      return res.status(403).json({ msg: "User already Created" });
    }
    const response = await User.create({
      email: sanitizedEmail,
      password: hashedPassword,
      username: username,
    });
    const link = `${process.env.CLIENT_URL}/verified/${response._id}`;
    const sentEmail = response.email;
    await verifyEmail(sentEmail, link);
    res.status(200).json({
      msg: "User Created Successfully",
      msg2: "Email Verification has been sent to you mail! Please Check Your mail",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something Went Wrong",
    });
  }
});

//signIn
router.post("/signIn", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: sanitizedEmail,
    });

    if (!user) {
      return res.status(403).json({ msg: "User not found with this email" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ msg: "You are not verified! Please Check Your mail" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.status(200).json({ msg: "Login Succesfully", token: token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wront" });
  }
});

//verify email
router.get("/verify/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(403).json({
        msg: "User not found",
      });
    }
    await User.updateOne(
      {
        _id: id,
      },
      {
        isVerified: true,
      }
    );
    return res.status(200).json({
      msg: "Email Verified! Please Login Now",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something Went Wrong",
    });
  }
});

//get Perticular user
router.get("/getUser", async function (req, res) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const user = await User.findOne({ _id: decode._id });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllWeeks", async function (req, res) {
  try {
    const weeks = await Week.find({});
    res.status(200).json({ weeks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/complete", async function (req, res) {
  try {
    const userId = req.body.userId;
    const weekId = req.body.weekId;
    const completed = req.body.completed;
    const isWeek = await Week.findOne({ _id: weekId });
    if (!isWeek) {
      return res.status(404).json({ message: "Week not found" });
    }
    const userCompletionStatus = isWeek.completionStatus.find(
      (status) => status.userId.toString() === userId
    );
    if (!userCompletionStatus) {
      // If the user's completion status doesn't exist yet, create a new one
      isWeek.completionStatus.push({ userId, completed });
    } else {
      // If the user's completion status exists, update its completed field
      userCompletionStatus.completed = completed;
    }

    // Save the updated week document
    const response = await isWeek.save();
    res.status(200).json({ msg: "Progress Updated Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/update", async function (req, res) {
  try {
    const username = req.body.username;
    const age = req.body.age;
    const number = req.body.number;
    const link = req.body.link;
    const gender = req.body.gender;
    const desc = req.body.description;
    const userId = req.body.userId;
    const user = await User.updateOne(
      { _id: userId },
      {
        username: username,
        PhoneNumber: number,
        age: age,
        socialLinks: link,
        gender: gender,
        bio: desc,
      }
    );
    const user2 = await User.findOne({
      _id: userId,
    });
    // console.log(user);
    res.status(200).json({ msg: "User Updated Successfully", user2 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;

//utils function
const verifyEmail = async (email, link) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.AUTH_EMAIL}`,
        pass: `${process.env.AUTH_PASS}`,
      },
    });
    const mailOptions = {
      from: "officialwork1103@gmail.com",
      to: `${email}`,
      subject: "Email Verification",
      text: "Dear User Please Verify Your email",
      html: `
      <div>
      <h3>Greetings from the CodeRail</h3>
      <a href=${link}>Please Click on this link to verify and activate you account
      </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something Went Wrong",
    });
  }
};
