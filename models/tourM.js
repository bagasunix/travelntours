const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  durations: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAvarege: {
    type: Number,
    default: 3.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  descriprion: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: Array,
    required: [true, 'A tour must have a cover image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

module.exports = mongoose.model('Tour', tourSchema);
