const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const singleUpload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ msg: "File size should be less than 1MB" });
    }
  } else if (err) {
    return res.status(400).json({ msg: err.message });
  }
  next();
}

module.exports = { singleUpload, multerErrorHandler };
