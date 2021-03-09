const { Schema, model, Types } = require('mongoose');
const CitySchema = require('./City.model');

const CountrySchema = new Schema({
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
     type: String
   }

  },

  weather: {

  },

  dateTime: {

  },

  attractions: [{
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    image: {
      src: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
        required: true,
      }
    }
  }]

})

const CountryModel = model('Country', CountrySchema);

module.exports = CountryModel;