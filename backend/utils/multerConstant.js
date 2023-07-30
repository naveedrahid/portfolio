const multer = require('multer');

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

module.exports = {
    uploadFeaturedImage,
}