const { OwnRecipe } = require("../models/recipe");
const { ctrlWrapper, HttpError } = require("../helpers");

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    title,
    category,
    instructions,
    description,
    thumb,
    preview,
    time,
    ingredients,
  } = req.body;

  const fixedIngredients =
    typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;
  const result = await OwnRecipe.create({
    title,
    category,
    instructions,
    description,
    thumb,
    preview,
    time,
    ingredients: fixedIngredients,
    owner,
  });
  res.status(201).json(result);
};

const getRecipesByOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await OwnRecipe.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await OwnRecipe.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};
module.exports = {
  addRecipe: ctrlWrapper(addRecipe),
  getRecipesByOwner: ctrlWrapper(getRecipesByOwner),
  deleteRecipe: ctrlWrapper(deleteRecipe),
};
