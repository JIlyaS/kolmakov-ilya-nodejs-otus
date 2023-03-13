const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const ctrlAuth = require("../../controllers/auth");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("login", "Логин пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 6 и меньше 12 символов"
    ).isLength({ min: 6, max: 12 }),
  ],
  ctrlAuth.registration
);
router.post("/login", ctrlAuth.login);

module.exports = router;
