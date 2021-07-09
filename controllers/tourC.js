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
        tours: tours,
      });
    } catch (err) {
      res.status(500).json({
        status: err.status,
        message: err.message,
      });
    }
  },
  getData: async (req, res, next) => {
    try {
      const tours = await Tour.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
      });
    } catch (err) {
      res.status(500).json({
        status: err.status,
        message: err.message,
      });
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, rating, price } = req.body;

      const valid = {
        name: 'string|empty:false',
        rating: 'number',
        price: 'number|empty:false',
      };

      const valids = v.validate(req.body, valid);

      if (valid.length) {
        return res.status(400).json({
          status: 'error',
          message: valid,
        });
      }

      const newTour = await Tour.create({ name, rating, price });

      res.status(200).json({
        status: 'success',
        data: newTour,
      });
    } catch (err) {
      res.status(500).json({
        status: err.status,
        message: err.message,
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!tours) {
        res.status(404).json({
          status: 'Error',
          message: 'No tour found with that ID',
        });
      }
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
      });
    } catch (err) {
      res.status(500).json({
        status: err.status,
        message: err.message,
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const tours = await Tour.findByIdAndDelete(req.params.id);

      if (!tours) {
        res.status(404).json({
          status: 'Error',
          message: 'No tour found with that ID',
        });
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      res.status(500).json({
        status: err.status,
        message: err.message,
      });
    }
  },
};
