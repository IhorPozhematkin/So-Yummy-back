const { Recipe } = require("../models/recipe");
const { HttpError, ctrlWrapper } = require("../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(
    id,
    "-createdAt -updatedAt -area -likes -youtube -tags"
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
