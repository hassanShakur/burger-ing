const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppError = require('./utilities/appError');
const burgerRouter = require('./routers/burgerRouters');

const {
  globalErrorHandler,
} = require('./controllers/errorController');

const app = express();

// Parse json data from frontend
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Enable cors options & cookies
app.use(
  cors({ credentials: true, origin: process.env.FRONT_END_URL })
);

app.use(express.json());


// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS Error Handling by Setting Headers
app.use((req, res, next) => {
  //TODO ADD Access-Control-Allow-Origin for the hosting server
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.FRONT_END_URL
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// Foward route requests
app.use('/api/burgers', burgerRouter);

// Handle unhandled requests
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The url ${req.originalUrl} could not be found on the server!`,
      404
    )
  );
});

// GLobal error handling middleware
app.use(globalErrorHandler);

module.exports = app;
