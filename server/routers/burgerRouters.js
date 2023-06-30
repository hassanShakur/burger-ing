const express = require('express');
const burgerController = require('../controllers/burgerControllers');

const router = express.Router();

// Controllers
router.route('/').get(burgerController.getAllBurgers).post(burgerController.createBurger)
router
  .route('/:id')
  .get(burgerController.getBurger)
  .patch(burgerController.updateBurger);

module.exports = router;
