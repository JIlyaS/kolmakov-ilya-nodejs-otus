const { Role, User } = require("../models");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

module.exports.addUserRole = async (req, res, next) => {
  try {
    const roleUser = new Role({ value: "USER" });
    const roleAdmin = new Role({ value: "ADMIN" });

    await roleUser.save();
    await roleAdmin.save();

    const roles = Role.find();

    res.json(roles);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Ошибка создания ролей" });
  }
};
