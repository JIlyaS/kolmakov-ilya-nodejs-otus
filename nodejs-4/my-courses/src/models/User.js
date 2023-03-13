const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  id: String,
  login: {
    type: String,
    required: true,
    unique: true,
    index: { unique: true },
  },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: String,
  roles: [
    {
      type: String,
      ref: "Role",
    },
  ],
});

const User = model("User", UserSchema);

module.exports = {
  User,
};
