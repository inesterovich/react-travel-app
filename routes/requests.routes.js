const countries = require('../initialData.json');
const countryCapitals = require('../country_capitals.json');

const fetch = require('node-fetch');
const { Router } = require("express");
const config = require('config');
const CountryModel = require('../model/County.model');

const countriesSampleResponse = require('./county_main_response.json');


const router = Router();

function stringfyCountries(array) {
  let result = array.map(item => item.trim().replace(' ', '_')
  )

  return result.join('|');

}

/*  
Мне нужны следующие роуты: 

1. Роуты запроса данных к API. 
2. Роуты приложения;
3. Роуты авторизации

*/



router.post('/getCountries', async (req, res) => {

  const countriesString = stringfyCountries(countries);
  const fieldsString = '&order_by=name&fields=name,id,intro,properties,images,snippet,coordinates&exclude_fields=id';
  const queryString = `${config.get('tripposoLocation')}?id=${countriesString}${fieldsString}`;
  const authHeaders = {
    'Content-Type': 'application/json',
    'X-Triposo-Account': 'R6UW3KQX',
    'X-Triposo-Token': 'pebxdd69doiwysybkqi5n3wuo9jsye7x'
  };


  try {

         /*
    const data = await fetch(queryString, {
      method: 'get',
      headers: authHeaders,
    });

    const result = await data.json(); */

    let results = countriesSampleResponse.results;

    const preparedDataArray = results.map((countryObject, index) => {
      return {
        name: countryObject.name,
        capital: countryCapitals[index],
        description: countryObject.intro,
        snippet: countryObject.snippet,
        image: {
          url: countryObject.images[0].source_url,
          caption: countryObject.images[0].caption
        },
        properties: countryObject.properties,
        coordinates: countryObject.coordinates,
        currency: {},
        weather: {

        },
        dateTime: {

        }
      }
    })


    if (preparedDataArray) {
      await CountryModel.create(preparedDataArray);
      res.json({ message: 'Documents are savedd'})
    } else {
      throw new Error('Trouble with creation models')
    }
      

     
   } catch (error) {
    console.log(error.message);
    process.exit(1);
   }
  

  

 
  
  
})


module.exports = router;