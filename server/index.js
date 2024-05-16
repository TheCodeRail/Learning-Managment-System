const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const globalRoute = require("./routes/GlobalRoutes");
require("dotenv").config();
const port = 8080;

// creating an instance of the express
const app = express();
app.use(express.json());
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
