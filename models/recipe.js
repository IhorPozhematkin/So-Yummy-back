const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const recipeSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "Write title for your recepie"],
    },
    category: {
      type: String,
      required: [true, "Set category for your recepie"],
    },
    instructions: {
      type: String,
      required: [true, "Write your instructions"],
    },
    description: {
      type: String,
      required: [true, "Write description for your recepie"],
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      required: [true, "Set cooking time for your recepie"],
    },
    popularity: {
      type: Number,
      default: 0,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    ingredients: [
      {
        _id: false,
        id: {
          type: Schema.Types.ObjectId,
          ref: "ingredient",
        },
        measure: {
          type: String,
          // required: true,
        },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string().required(),
  ingredients: Joi.string(),
});

const schemas = { addSchema };

const Recipe = model("recipe", recipeSchema);
const OwnRecipe = model("ownRecipes", recipeSchema, "ownRecipies");

module.exports = { Recipe, OwnRecipe, schemas };
