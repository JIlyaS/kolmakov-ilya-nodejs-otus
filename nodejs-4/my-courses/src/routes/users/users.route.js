const express = require("express");

const router = express.Router();

const ctrlUser = require("../../controllers/user");

router.get("/", ctrlUser.getUsers);
router.get("/:id", ctrlUser.getUser);
router.get("/roles", ctrlUser.addUserRole);

module.exports = router;
