const router = require('express').Router();

// Import Controllers
const tourController = require('../controllers/tourC');

router
  .route('/')
  .get(tourController.index)
  .post(tourController.create);

router
  .route('/:id')
  .patch(tourController.update)
  .delete(tourController.delete);

module.exports = router;