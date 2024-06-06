const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImageToCloudinary = async (filepath, folder = "") => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filepath, {
      folder: folder,
    });

    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Error uploading image to Cloudinary");
  }
};

module.exports = { uploadImageToCloudinary };
