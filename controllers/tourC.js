const Tour = require('../models/tourM');

module.exports = {
  getAllData: async (req, res, next) => {
    try {
      const tours = await Tour.find();
      // Ress
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: tours,
      });
    } catch (err) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
      });
    }
  },
  create: async (req, res, next) => {
    console.log('Hallo ini create');
  },
  update: async (req, res, next) => {
    console.log('Hallo ini update');
  },
  delete: async (req, res, next) => {
    console.log('Hallo ini delete');
  },
};
