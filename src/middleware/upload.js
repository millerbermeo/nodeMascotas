import multer from 'multer';
import path from 'path';
// import sa from '../../src/uploads'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  

  const upload = multer({ storage: storage });

  export default upload;