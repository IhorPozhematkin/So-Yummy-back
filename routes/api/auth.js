const express = require("express");

const ctrl = require("../../controllers/auth");
const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationCode", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.put("/:id", authenticate, isValidId, ctrl.updateById);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
router.post("/subscribe", authenticate, ctrl.subscribe);

module.exports = router;
