// Lib Validator
const Validator = require('fastest-validator');

const v = new Validator();
// /Model
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
  create: async (req, res, next) => {},
  update: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
