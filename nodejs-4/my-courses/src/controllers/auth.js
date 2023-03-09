const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");

const { User, Role } = require("../models");
// const { validationResult } = require("express-validator");

// const { Course, Lesson } = require("../models");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Ошибка при регистрации", errors });
    }
    const { login, password, username, email } = req.body;

    const candidate = await User.findOne({ login });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем уже существует" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "USER" });
    const user = new User({
      login,
      password: hashPassword,
      username,
      email,
      roles: [userRole.value],
    });
    await user.save();
    return res.json({ message: "Пользователь успешно зарегистрирован" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Registration error" });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Пользователь ${login} не найден` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: `Введён неверный логин или пароль` });
    }
    const token = generateAccessToken(user._id, user.roles);
    console.log("token", token);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Ошибка авторизации" });
  }
  // try {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
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
  // } catch (err) {
  //   console.error(err);
  // }
};
