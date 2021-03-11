const { Schema, model, Types } = require('mongoose');
const CitySchema = require('./City.model');
const AttractionSchema = require('./Attraction.schema');

const CountrySchema = new Schema({
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

  properties: [
    
  ],

  coordinates: [

  ],

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

  weather: {

  },


  attractions: [AttractionSchema]

})

const CountryModel = model('Country', CountrySchema);

module.exports = CountryModel;