const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  id: String,
  text: String,
  createdAt: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = model("Comment", CommentSchema);

module.exports = {
  Comment,
};
