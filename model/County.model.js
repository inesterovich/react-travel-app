const { Schema, model, Types } = require('mongoose');
const CountryBaseSchema = require('./Country-base.shema');
const CountryTranslateSchema = require('./Country-translate.schema');



const CountrySchema = new Schema({

  en: CountryBaseSchema,
  ru: CountryTranslateSchema,
  es: CountryTranslateSchema
  

})

const CountryModel = model('Country', CountrySchema);

module.exports = CountryModel;