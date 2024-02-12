const { Recipe } = require("../models/recipe");
const { ctrlWrapper, HttpError } = require("../helpers");

const addRecipeToFavorites = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    throw HttpError(404, "Recipe not found");
  }

  await Recipe.findByIdAndUpdate(
    id,
    { $addToSet: { favorites: userId } },
    { new: true }
  );

  res.json({ message: "Recipe added to favorites successfully" });
};

const getFavoriteRecipes = async (req, res) => {
  const { _id: userId } = req.user;

  const favoriteRecipes = await Recipe.find({ favorites: userId });

  res.json(favoriteRecipes);
};

const removeRecipeFromFavorites = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  await Recipe.findByIdAndUpdate(
    id,
    { $pull: { favorites: userId } },
    { new: true }
  );

  res.json({ message: "Recipe removed from favorites successfully" });
};

module.exports = {
  addRecipeToFavorites: ctrlWrapper(addRecipeToFavorites),
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  removeRecipeFromFavorites: ctrlWrapper(removeRecipeFromFavorites),
};
