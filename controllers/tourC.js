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
  create: async (req, res, next) => {
    try {
      // const userId = await User.findById(req.user.id);

      const {
        name,
        duration,
        maxGroup,
        difficulty,
        ratingsAverage,
        ratingsQuantity,
        price,
        summary,
        description,
        imageCover,
        images,
        startDates,
        startLocation,
        locations,
        guides,
      } = req.body;

      const schema = {
        name: 'string|empty:false',
        duration: 'number|empty:false',
        maxGroup: 'number|empty:false',
        difficulty: 'string|empty:false',
        ratingsAverage: 'number|empty:false',
        ratingsQuantity: 'number|empty:false',
        price: 'number|empty:false',
        summary: 'string|empty:false',
        description: 'string|empty:false',
        imageCover: 'string|empty:false',
        images: 'array|item:string|empty:false',
        startDates: 'array|item:date|empty:false',
        startLocation: {
          type: 'object',
          strict: true,
          props: {
            type: {
              type: 'string',
              empty: false,
              enum: ['Point'],
              default: 'Point',
            },
            coordinates: { type: 'array', empty: false, items: 'number' },
            address: 'string|empty:false',
            description: 'string|empty:false',
          },
        },
        locations: {
          type: 'array',
          strict: true,
          props: {
            type: {
              type: 'string',
              empty: false,
              enum: ['point'],
              default: 'point',
            },
            coordinates: { type: 'array', empty: false, items: 'number' },
            address: 'string|empty:false',
            description: 'string|empty:false',
            day: 'number|empty:false',
          },
        },
        guides: {
          type: 'array',
          items: 'string',
          empty: false,
        },
      };

      const checkName = await Tour.findOne({ name: name });

      if (checkName) {
        return res.status(400).json({
          status: 'error',
          message: 'Name tour is already exist',
        });
      }

      const newTour = await Tour.create({
        name,
        duration,
        maxGroupSize: maxGroup,
        difficulty,
        ratingsAverage,
        ratingsQuantity,
        price,
        summary,
        description,
        imageCover,
        images,
        startDates,
        startLocation,
        locations,
        guides,
      });

      res.status(201).json({
        status: 'success',
        data: newTour,
      });
    } catch (err) {
      return res.status(res.status).json({
        status: res.status,
        message: res.message,
      });
    }
  },
  update: async (req, res, next) => {
    // console.log('Hallo ini update');
  },
  delete: async (req, res, next) => {
    // console.log('Hallo ini delete');
  },
};
