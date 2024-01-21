const fs = require("fs/promises");
const jimp = require("jimp");
const path = require("path");

const { Recipe } = require("../models/recipe");
const { ctrlWrapper, HttpError } = require("../helpers");

const recipesDir = path.join(__dirname, "../", "public", "recipes");

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const { title, category, instructions, description, time, ingredients } =
    req.body;

  const fixedIngredients =
    typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;

  const { path: tempUpload, originalname } = req.file;

  const originalImage = await jimp.read(tempUpload);

  const sizes = [
    { width: 279, height: 268 },
    { width: 124, height: 124 },
    { width: 343, height: 323 },
    { width: 336, height: 323 },
    { width: 228, height: 232 },
    { width: 300, height: 323 },
    { width: 318, height: 324 },
    { width: 97, height: 85 },
    { width: 357, height: 344 },
  ];

  const photoURLs = [];

  let result;

  result = await Recipe.create({
    title,
    category,
    instructions,
    description,
    thumb: "",
    preview: "",
    time,
    ingredients: fixedIngredients,
    owner,
    photoURLs,
  });

  for (const size of sizes) {
    const resizedImage = originalImage.clone().resize(size.width, size.height);

    const resizedImageBuffer = await resizedImage.getBufferAsync(jimp.AUTO);

    const resultUploadPath = path.join(
      recipesDir,
      `${result._id}_${size.width}x${size.height}_${originalname}`
    );

    await fs.writeFile(resultUploadPath, resizedImageBuffer);

    const photoURL = path.join(
      "recipes",
      `${result._id}_${size.width}x${size.height}_${originalname}`
    );
    photoURLs.push(photoURL);
  }

  await fs.unlink(tempUpload);

  result = await Recipe.findByIdAndUpdate(
    result._id,
    {
      $set: {
        thumb: photoURLs[2],
        preview: photoURLs[1],
        photoURLs,
      },
    },
    { new: true }
  );

  res.status(201).json(result);
};

const getRecipesByOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Recipe.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndDelete(id);
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
