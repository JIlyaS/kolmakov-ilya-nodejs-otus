const { Role, User } = require("../models");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
  }
};
