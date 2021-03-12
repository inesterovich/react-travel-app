const { Schema, Types } = require('mongoose');

const CitySchema = new Schema({
  name: {
    type: String,
  },

  coordinates: [Number]
})

module.exports = CitySchema;