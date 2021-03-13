const { Schema, Types } = require('mongoose');

const AttractionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true
  },

  rating: [{
    value: {
      type: Number,
      required: true
    },
    userId: {
      type: Types.ObjectId,
      required: true
    },

    avatar: {
      type: String,
      required: true
    }
  }]
})

module.exports = AttractionSchema;