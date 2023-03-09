const { Schema, model } = require("mongoose");

// const { Lesson } = require("./Lesson");

const CourseSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  description: String,
  // previewImg: {
  //   fileName: {
  //     type: String,
  //     required: true,
  //   },
  //   file: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  //   uploadTime: {
  //     type: Date,
  //     default: Date.now,
  //   },
  // },
  previewImg: {
    fileName: {
      type: String,
      // required: true,
    },
    filePath: {
      type: String,
      // required: true,
    },
    fileType: {
      type: String,
      // required: true,
    },
    fileSize: {
      type: String,
      // required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Course = model("Course", CourseSchema);

module.exports = {
  Course,
};
