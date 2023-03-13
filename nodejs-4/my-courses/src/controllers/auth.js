const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");

const { User, Role } = require("../models");

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
    const { login, password, username, email, role } = req.body;

    const candidate = await User.findOne({ login });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем уже существует" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: role ?? "USER" });
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
    return res.json({ token, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Ошибка авторизации" });
  }
};
