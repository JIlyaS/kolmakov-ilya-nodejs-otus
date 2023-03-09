const express = require("express");

const router = express.Router();

const ctrlCourse = require("../../controllers/course");
const ctrlLesson = require("../../controllers/lesson");
const { upload } = require("../../utils/upload");
const authMiddleware = require("../../middlewares/authMiddleware");

// const multer = require("multer");

// const upload = multer({
//   dest: "uploads/",
//   fileFilter: (req, file, cb) => {
//     // объект file содержит ту же информацию о файле,
//     // что и req.file в предыдущем примере
//     const extension = path.extname(file.originalname);

//     // колбэк Node-style. Первый аргумент — ошибка,
//     // второй — логическое значение, следует ли обрабатывать файл
//     cb(
//       null,
//       extension === ".png" || extension === ".jpg" || extension === ".jpeg"
//     );
//   },
// });

const courseSchemaPost = require("./validationSchema");

router.get("/", ctrlCourse.getCourses);
router.get("/:id", ctrlCourse.getCourse);
router.post("/", [courseSchemaPost, authMiddleware], ctrlCourse.createCourse);
router.patch("/:id", authMiddleware, ctrlCourse.updateCourse);
router.delete("/:id", authMiddleware, ctrlCourse.deleteCourse);
router.post(
  "/preview/upload",
  [upload.single("file"), authMiddleware],
  ctrlCourse.uploadPreview
);

router.get("/:id/lessons", ctrlLesson.getCourseLessons);
router.post("/:id/lessons", ctrlLesson.createCourseLesson);

// router.post("/api/v1/course", courseSchemaPost, (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   // Course.find((err, courses) => {
//   //   if (err) return res.status(500).send({ error: "Server error" });

//   //   res.send(courses);
//   // });

//   const course = new Course(req.body);

//   course.save((err) => {
//     if (err) {
//       if (err.name === "ValiadtionError") {
//         return res.status(400).send({ error: "Validation error" });
//       }
//       console.log(err);
//       return res.status(500).send({ error: "Server error" });
//     }

//     res.status(201).send(course);
//   });
// });

// router.get("/api/v1/course/:id", (req, res) => {
//   Course.findById(req.params.id, (err, course) => {
//     if (err) return res.status(500).send({ error: "Server error" });
//     if (!course) return res.status(404).send({ error: "Not found" });

//     res.send(course);
//   });

//   const course = new Course(req.body);

//   course.save((err) => {
//     if (err) {
//       if (err.name === "ValiadtionError") {
//         return res.status(400).send({ error: "Validation error" });
//       }
//       return res.status(500).send({ error: "Server error" });
//     }

//     res.status(201).send(course);
//   });
// });

module.exports = router;
