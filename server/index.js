const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const globalRoute = require("./routes/GlobalRoutes");
const bodyParser = require("body-parser");
const path = require("path");
const { Billing } = require("./db");

require("dotenv").config();
const port = 8080;

// creating an instance of the express
const app = express();
// Body parser middleware for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function (req, res) {
  res.status(200).json({
    msg: "Ok",
  });
});

//routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/api", globalRoute);

//listen on the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
