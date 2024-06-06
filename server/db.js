const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//connect
mongoose.connect(`${process.env.MONGO_URL}`);

//creating user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
  },
  age: {
    type: Number,
  },
  socialLinks: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary"], // You can restrict the values to these options
  },
  bio: {
    type: String,
    maxlength: 250, // Limit the length of the bio to 250 characters
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
});
//week todo schema
const weekSchema = new mongoose.Schema({
  weekname: {
    type: String,
    required: true,
    unique: true,
  },
  assignment: [
    {
      type: String,
    },
  ],
  videoLecture: [
    {
      type: String,
      required: true,
    },
  ],
  lectureNotes: [
    {
      type: String,
      required: true,
    },
  ],
  completionStatus: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const feedbackSchema = new mongoose.Schema({
  content: String,
  communication: String,
  websiteexp: String,
  continueCourse: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Week = mongoose.model("Week", weekSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = {
  User,
  Week,
  Feedback,
};
