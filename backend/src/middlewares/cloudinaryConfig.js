const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const FOLDER_NAME = 'recipe_app_uploads'; 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: FOLDER_NAME, 
    format: async (req, file) => 'auto',
    public_id: (req, file) => {
      const extension = path.extname(file.originalname);
      const filenameBase = path.parse(file.originalname).name;
      const uniqueSuffix = Date.now();
      
      return `uploads/${filenameBase}-${uniqueSuffix}${extension}`; 
    },
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
