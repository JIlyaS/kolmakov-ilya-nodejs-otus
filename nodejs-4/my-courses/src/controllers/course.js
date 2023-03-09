const { validationResult } = require("express-validator");

const authMiddleware = require("../middlewares/authMiddleware");

const { Course, Lesson, PreviewImgCourse } = require("../models");

// module.exports.getCourses = async (req, res, next) => {
//   try {
//     const news = await News.find({}).populate("user");
//     const updatedNews = news.map((item) => ({
//       id: String(item._id),
//       text: item.text,
//       title: item.title,
//       user: item.user,
//     }));
//     return res.json(updatedNews);
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports.getCourses = async (req, res, next) => {
  try {
    // Course.find((err, courses) => {
    //   if (err) return res.status(500).send({ error: "Server error" });

    //   res.json(courses);
    // });

    const courses = await Course.find({});

    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
  }
};

module.exports.createCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = new Course(req.body);
    // const preview

    course.save((err) => {
      if (err) {
        if (err.name === "ValiadtionError") {
          return res.status(400).send({ error: "Validation error" });
        }
        console.log(err);
        return res.status(500).send({ error: "Server error" });
      }

      res.status(201).send(course);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
  }
};

module.exports.updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    // const { title, description } = req.body;

    await Course.findByIdAndUpdate(courseId, { ...req.body });
    const currentCourse = await Course.findById(courseId);

    res.status(200).json(currentCourse);
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    await Course.findByIdAndDelete(courseId);

    res.status(200).json(courseId);
  } catch (err) {
    console.error(err);
  }
};

module.exports.uploadPreview = async (req, res, next) => {
  try {
    const file = new PreviewImgCourse({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // req.file.size
    });
    await PreviewImgCourse.collection.drop();
    await file.save();
    res.status(201).json({ message: "Файл загружен успешно" });
  } catch (err) {
    console.error(err);
    res.status(400).send(error.message);
  }
};

module.exports.uploadFileMultiple = async (req, res, next) => {
  try {
    const filesArray = [];
    req.files.forEach((item) => {
      const file = {
        fileName: item.originalname,
        filePath: item.filePath,
        fileType: item.fileType,
        fileSize: fileSizeFormatter(item.fileSize, 2),
      };
      filesArray.push(file);
    });
    // const multipleFiles =

    res.status(201).json({ message: "Файлы загружены успешно" });
  } catch (err) {
    console.error(err);
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
  );
};
