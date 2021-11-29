const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, path.join(process.env.PWD, 'src', 'uploadedFiles'))
  },
  filename(req, file, cb){
    cb(null, `csv-${Date.now()}${path.extname(file.originalname)}`)
  }
});


const uploadMulter = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter(req, file, cb){
    const filetypes = /csv/
    console.log('Mimetype---->', file);
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return cb(null, true)
    }
    return cb(null, false)
  },
});

module.exports = uploadMulter
