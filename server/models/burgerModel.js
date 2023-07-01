const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide meal name!'],
    },
    category: {
      type: String,
      required: [true, 'Please provide meal category!'],
    },
    prices: {
      type: Array,
      required: [true, 'Please provide the price!'],
    },
    description: {
      type: String,
      required: [true, 'Please provide meal description!'],
    },
    bundle: {
      type: String,
      required: [false],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Burger = mongoose.model('Burger', burgerSchema);

module.exports = Burger;
