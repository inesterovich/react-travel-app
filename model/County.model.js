const { Schema, model, Types } = require('mongoose');

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  capital: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  snippet: {
    type: String,

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
    
  },

  weather: {

  },

  dateTime: {

  }

})

const CountryModel = model('Country', CountrySchema);

module.exports = CountryModel;