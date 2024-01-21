const express = require("express");

const ctrl = require("../../controllers/ownRecipes");
const {
  authenticate,
  validateBody,
  isValidId,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/recipe");

const router = express.Router();

router.post(
  "/add-recipe",
  authenticate,
  upload.single("photo"),
  validateBody(schemas.addSchema),
  ctrl.addRecipe
);
router.get("/my-recipes", authenticate, ctrl.getRecipesByOwner);
router.delete("/:id", authenticate, isValidId, ctrl.deleteRecipe);

module.exports = router;
