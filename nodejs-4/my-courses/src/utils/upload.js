const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageExtensions = [".jpg", ".png", ".svg"];
    const extensions = path.extname(file.originalname);

    const uploadPath = imageExtensions.includes(extensions)
      ? "uploads/images"
      : "uploads";

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueName}${extension}`);
    // cb(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: diskStorage, fileFilter });

module.exports = {
  upload,
};
