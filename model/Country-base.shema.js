const { Schema, model, Types } = require('mongoose');
const CitySchema = require('./City.model');
const AttractionSchema = require('./Attraction.schema');

const CountryBaseSchema = new Schema({
  code: {
    type: String,
    required: true,
  },

  flag: {
    type: String,
  },

  name: {
    type: String,
    required: true,
    unique: true,
  },

  capital: CitySchema,
  coordinates: [Number],

  description: {
    type: String,
   required: true,
  },

  snippet: {
    type: String,
    required: true,

  },

  image: {

    url: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      required: true
    }
  },

 

  coordinates: [Number],

  currency: {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    symbol: {
      type: String,
      required: true,
    },

  },


  attractions: [AttractionSchema],

  video: {
    type: String,
    required: true,
  }
})

module.exports = CountryBaseSchema;