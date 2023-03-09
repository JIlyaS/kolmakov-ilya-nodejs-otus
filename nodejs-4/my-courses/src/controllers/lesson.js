const mongoose = require("mongoose");

const { Course, Lesson } = require("../models");

module.exports.getCourseLessons = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const currentCourse = await Course.findById(courseId)
      .populate("lessons")
      .exec();

    res.status(200).json(currentCourse.lessons);
  } catch (err) {
    console.error(err);
  }
};

module.exports.createCourseLesson = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const currentCourse = await Course.findById(courseId);

    const lesson = new Lesson({
      ...req.body,
      course: currentCourse._id,
    });

    lesson.save(async (err, updatedLesson) => {
      if (err) {
        if (err.name === "ValiadtionError") {
          return res.status(400).send({ error: "Validation error" });
        }
        console.log(err);
        return res.status(500).send({ error: "Server error" });
      }

      // req.user._id;

      // Course.findByIdAndUpdate(courseId, {
      //   $push: { lessons: { firstName: "Harry", lastName: "Potter" } },
      // });

      Course.findByIdAndUpdate(
        courseId,
        //   {
        //   // lessons: currentCourse.lessons.push(updatedLesson._id),
        //   $push: {
        //     lessons: updatedLesson._id,
        //   },
        // }
        {
          lessons: [
            ...currentCourse.lessons.map((lesson) => lesson._id),
            updatedLesson._id,
          ],
        },
        (err, data) => {
          console.log("data", data);
        }
      );

      // const currentCourse = await Course.findById(courseId)
      //   .populate("lessons")
      //   .exec();
      // currentCourse.lessons = currentCourse.lessons.push(updatedLesson._id);
      // await currentCourse.save();

      // console.log("updatedLesson", updatedLesson);

      // const currentCourse = await Course.findById(courseId)
      //   .populate("lessons")
      //   .exec();

      // await Course.findByIdAndUpdate(courseId, {
      //   lessons: {
      //     $push: {
      //       lessons: {
      //         title: updatedLesson.title,
      //         course: mongoose.Types.ObjectId(courseId),
      //       },
      //     },
      //   }, // mongoose.Types.ObjectId(courseId),
      // });

      res.status(201).json(updatedLesson);
    });
  } catch (err) {
    console.error(err);
  }
};
