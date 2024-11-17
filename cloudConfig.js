const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: "8H3OnwBo4C6nIk8qk7by_kz81-o"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'STAYHUB',
      allowedformats: ["png", "jpg", "jpeg"], // supports promises as well
    },
  });

  module.exports = {
    cloudinary,
    storage
  }