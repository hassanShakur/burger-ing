const AppError = require('./appError');

exports.handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid inputs! ${errors.join('. ')}`;
  return new AppError(message, 400);
};

exports.handleDuplicateFieldsError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please try again!`;
  return new AppError(message, 400);
};

exports.handleCastError = (err) => {
  const message = `The id "${err.value}" does not exist! Please use a valid ID.`;
  return new AppError(message, 400);
};
