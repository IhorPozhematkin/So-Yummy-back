const express = require("express");

const ctrl = require("../../controllers/favoriteRecipes");
const { authenticate, isValidId } = require("../../middlewares");

const router = express.Router();

router.post(
  "/favorite/:id",
  authenticate,
  isValidId,
  ctrl.addRecipeToFavorites
);
router.get("/favorite", authenticate, ctrl.getFavoriteRecipes);
router.delete(
  "/favorite/:id",
  authenticate,
  isValidId,
  ctrl.removeRecipeFromFavorites
);

module.exports = router;
