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
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      required: true,
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

module.exports = { Recipe, schemas };
