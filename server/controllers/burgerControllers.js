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
  const burgers = await Burger.find();

  res.status(200).json({
    status: 'Success',
    results: burgers.length,
    data: {
      burgers,
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
