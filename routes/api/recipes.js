const express = require("express");

const ctrl = require("../../controllers/recipes");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/:id", authenticate, isValidId, ctrl.getById);

module.exports = router;
