const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pictures');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`);
  },
});

const getExtension = (mimetype) => {
  switch (mimetype) {
    case 'image/png':
      return '.png';
    case 'image/jpeg':
      return '.jpeg';
    case 'image/jpg':
      return '.jpg';
  }
};

const picture = multer({ storage: storage });

module.exports = picture;
