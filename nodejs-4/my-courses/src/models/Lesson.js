const { Schema, model } = require("mongoose");

const LessonSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  description: String,
  previewImg: String,
  video: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      text: String,
      createdAt: Date,
      author: String,
      // user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Lesson = model("Lesson", LessonSchema);

module.exports = {
  Lesson,
};
