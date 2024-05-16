const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../db");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post("/forgotPassword", async function (req, res) {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(403)
        .json({ msg: "No Such Email is present in Our database" });
    }
    const link = `http://localhost:5173/resetPassword/${user._id}`;
    await resetPasswordLink(email, link);
    res.status(200).json({ msg: "Please check your mail" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/changePassword", async function (req, res) {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.updateOne(
      {
        _id: id.id,
      },
      { password: hashedPassword }
    );
    res.status(200).json({ msg: "Password Changed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.get("/getAllUsers", async function (req, res) {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      username: {
        $regex: filter,
      },
    });
    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        email: user.email,
        _id: user._id,
        PhoneNumber: user.PhoneNumber,
        isSubscribed: user.isSubscribed,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});
module.exports = router;
//utils function
const resetPasswordLink = async (email, link) => {
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
        <a href=${link}>Please Click on this link to reset your account password
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
