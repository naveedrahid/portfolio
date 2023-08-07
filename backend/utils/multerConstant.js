const multer = require('multer');
const fs = require('fs');
const path = require('path');

const featuredImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadFeaturedImage = multer({ storage: featuredImageStorage }).single(
    'featuredimage'
);

const removeOldImage = (oldImageFilename) => {
    if (!oldImageFilename) {
      return; // If oldImageFilename is not provided, do nothing
    }
  
    const imagePath = path.join('public/uploads', oldImageFilename);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to remove old image:', err);
      }
    });
  };

module.exports = {
    uploadFeaturedImage,
    removeOldImage
}