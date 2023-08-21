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
    return; 
  }

  const imagePath = path.join('public/uploads', oldImageFilename);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Failed to remove old image:', err);
    }
  });
};

function removeImage(imageFilename) {
  if (!imageFilename) {
    return;
  }
  const imagePath = path.join('public/uploads', imageFilename);
  if (fs.existsSync(imagePath)) {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to remove image:', err);
      } else {
        console.log('Image deleted');
      }
    });
  } else {
    console.error('Image file does not exist:', imagePath);
  }
}

module.exports = {
  uploadFeaturedImage,
  removeOldImage,
  removeImage
}