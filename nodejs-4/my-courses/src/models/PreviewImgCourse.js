const { Schema, model } = require("mongoose");

const previewImgCourseSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PreviewImgCourse = model("PreviewImgCourse", previewImgCourseSchema);

module.exports = {
  PreviewImgCourse,
};
