const { Schema } = require('mongoose');

const CountryTranslateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  capitalName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },

  snippet: {
    type: String,
    required: true
  },

  imageCaption: {
    type: String,
    required: true
  },

  attractions: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ]

})

module.exports = CountryTranslateSchema;