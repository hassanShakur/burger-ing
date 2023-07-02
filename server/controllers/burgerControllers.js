const _ = require('lodash');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
const Burger = require('../models/burgerModel');

exports.createBurger = catchAsync(async (req, res, next) => {
  const newBurger = await Burger.create({ ...req.body });

  res.status(201).json({
    status: 'Success',
    data: {
      burger: newBurger,
    },
  });
});

exports.getAllBurgers = catchAsync(async (req, res, next) => {
  const wraps = await Burger.find({ category: 'wraps' });
  const beef = await Burger.find({ category: 'beef' });
  const chicken = await Burger.find({ category: 'chicken' });
  const kids = await Burger.find({ category: 'kids' });
  const snack = await Burger.find({ category: 'snack' });
  const salad = await Burger.find({ category: 'salad' });
  const king = await Burger.find({ category: 'king' });
  const desert = await Burger.find({ category: 'desert' });

  const burgers = [
    wraps,
    beef,
    chicken,
    kids,
    snack,
    salad,
    king,
    desert,
  ];

  res.status(200).json({
    status: 'Success',
    results: burgers.length,
    data: {
      burgers
    },
  });
});

exports.getBurger = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const burger = await Burger.findById(id);

  if (!burger) {
    next(new AppError('No burger found with that id!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      burger,
    },
  });
});

exports.updateBurger = catchAsync(async (req, res, next) => {
  const burger = await Burger.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!burger) {
    return next(new AppError('No burger found with that id!', 404));
  }

  res.status(200).json({
    status: 'Success',
    burger: _.pick(burger, ['id', 'name', 'email', 'avatar']),
  });
});
