const countries = require('../initialData.json');
const countryCapitals = require('../country_capitals.json');

const fetch = require('node-fetch');
const { Router, response } = require("express");
const config = require('config');
const CountryModel = require('../model/County.model');
const { model } = require('mongoose');

const countriesSampleResponse = require('./county_main_response.json');
const citiesSampleResponse = require('./cities_example_response.json');
const CitySchema = require('../model/City.model');


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

const authHeaders = {
  'Content-Type': 'application/json',
  'X-Triposo-Account': 'R6UW3KQX',
  'X-Triposo-Token': 'pebxdd69doiwysybkqi5n3wuo9jsye7x'
};

const fieldsString = '&order_by=name&fields=name,id,intro,properties,images,snippet,coordinates&exclude_fields=id';

router.post('/getCountries', async (req, res) => {

  const countriesString = stringfyCountries(countries);
  
  const queryString = `${config.get('tripposoLocation')}?id=${countriesString}${fieldsString}`;



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
        capital: {
          name: countryCapitals[index]
        },
        coordinates: [countryObject.coordinates.latitude, countryObject.coordinates.longitude],
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
       
      }
    })


    if (preparedDataArray) {
      await CountryModel.create(preparedDataArray);
      res.json({ message: 'Documents are saved'})
    } else {
      throw new Error('Trouble with creation models')
    }
      

     
   } catch (error) {
    console.log(error.message);
    process.exit(1);
   }
  

  

 
  
  
})


router.post('/getCities', async (req, res) => {
  try {
   
    const countries = await CountryModel.find({});

    let capitals = countries.map((country) => {
      return {
        bd_id: country.capital._id,
        name: country.capital.name,
        country_id: country.name
      }
    });

     /*

    const requests = capitals.map((capital, index) => {
      const name = capital.name.trim().replace(' ', '_').replace(/[^a-zA-Z_]/g, "");
      const fetchUri = `${config.get('tripposoLocation')}?part_of=${capital.country_id.replace(' ', '_')}&type=city&count=1&fields=id,score,intro,name,snippet,country_id&annotate=trigram:${name}&trigram=>=0.9`;
      console.log(name)
      
      const data =  fetch(fetchUri, {
        method: 'get',
        headers: authHeaders,
      }); 


      return data;
        
      
    });

    const apiResponse = await Promise.all(requests);
    const apiData = await Promise.all(apiResponse.map(response => response.json()));
    let results = apiData.map(item => item.results).flat();
    */
    
    let results = citiesSampleResponse;

    capitals = capitals.map((capital, index) => {
      return {
        ...capital,
        description: results[index].intro,
        snippet: results[index].snippet,
        coordinates: []
     }
    })
    

    countries.forEach(async (country, index) => {
      const model = await CountryModel.findById(country._id);
      model.capital = capitals[index];
      await model.save();

    }  )

    res.json('Ok');




    

  

   
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router;