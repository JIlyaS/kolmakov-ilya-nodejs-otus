const express = require("express");

const router = express.Router();

const ctrlUser = require("../../controllers/user");

router.get("/", ctrlUser.getUsers);

module.exports = router;
