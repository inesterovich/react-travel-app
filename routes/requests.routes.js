const countries = require('../initialData.json');
const countryCapitals = require('../country_capitals.json');
const attractionsSampleResponse = require('../routes/attractions_sample_response.json');


const fetch = require('node-fetch');
const { Router, response } = require("express");
const config = require('config');
const CountryModel = require('../model/County.model');
const { model } = require('mongoose');

const countriesSampleResponse = require('./county_main_response.json');
const citiesSampleResponse = require('./cities_example_response.json');
const CitySchema = require('../model/City.model');
const { base } = require('../model/County.model');


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


// Нужен ли тут Content-Type?
const authHeaders = {
  'X-Triposo-Account': 'R6UW3KQX',
  'X-Triposo-Token': 'pebxdd69doiwysybkqi5n3wuo9jsye7x'
};



const fieldsString = '&order_by=name&fields=name,id,intro,properties,images,snippet,coordinates&exclude_fields=id';

/* Мне нужна функция apiRequest*/

function apiRequest(
 config
) {

  let {
    authData,
    baseUri,
    endPoint,
    searchBy,
    count,
    fields,
    exclude,
    trigram,
    distance,
    sortBy } = config;

  if (typeof authData === 'object') {
 
    if (searchBy && Array.isArray(searchBy)) {
    //  searchBy = ['location_id', 'Russia'] || ''
      
      searchBy = searchBy.map(string => string.replace(' ', '_')).join('=');
    } else if (!searchBy) {
      searchBy = '';
    } else {
      throw new Error('searchBy should be an array or empty string')
    }

    // fields = [id, images, intro, snippet, tags, location_id]

    if (fields && Array.isArray(fields)) {
      fields = `fields=${fields.join()}`
    } else if (!fields) {
      fields = '';
    } else if (fields === "all") {
      fields = `fields=${fields}`;
    } else {
      fields="ERROR"
    }

    if ( count && typeof count === 'number') {
      count = `count=${count}`
    } else if (!count) {
      count='count=6'
    } else {
      throw new TypeError('count should be a number')
    }

    
    const queryString =
      `${baseUri}/${endPoint}.json?${searchBy}&${count}&${fields}`.replace('?&', '?');
    
    const request = fetch(queryString, { headers: authData});
    return request;
  }

  // В конечном итоге, от функции я ожидаю, что она будет возвращать готовый объект для функции fetch
  

}

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
        currency: {
          code: '--'
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

router.post('/getCurrencies', async (req, res) => {
  try {
    const countries = await CountryModel.find({});
    const currencies = countries.map(country => {
      return {
        _id: country._id,
        code: country.currency.code,
        
      }
    });

    const requests = currencies.map((currencyObj) => {
      const apiKey = '06d6831204e1450b40012dc2';
      const baseUri = 'https://v6.exchangerate-api.com'
      const fetchUri = `${baseUri}/v6/${apiKey}/latest/${currencyObj.code}`;

      return fetch(fetchUri);
    });

    const apiResponse = await Promise.all(requests);
    const apiData = await Promise.all(apiResponse.map(response => response.json()));
    
  

    

    res.json(apiData);

    
  } catch (error) {
    
  }
})

router.post('/getAttractions', async (req, res) => {
  
// По факту, это тоже функция из объекта или класса dataService
  
  let countries = (await CountryModel.find({}));
  let countryNames = countries.map(country => country.name)

  
  /*
  const fields = ['id', 'images', 'name', 'intro', 'snippet', 'tags', 'location_id'];


  let requests = countryNames.map(countryName => {
    const config = {
      authData: authHeaders,
      baseUri: 'https://www.triposo.com/api/20201111',
      endPoint: 'poi',
      searchBy: ['location_id', countryName],
      count: 40,
      fields,
    }

    return apiRequest(config);

  })

  const apiResponse = await Promise.all(requests);
  const apiData = (await Promise.all
    (apiResponse.map(response => response.json()))).map(object => object.results);
  
  */
  

  
  let results = attractionsSampleResponse;

  /* Мне нужно отфильтровать достопримечательности по двум параметрам: */

  let filteredData = results.map(countryAttractions =>
    countryAttractions
      .map(attraction => {
    
      return {
        ...attraction,
        images: attraction.images.filter(image => image.caption !== null &&
          image.caption !== 'image')
      }
      })
      .filter(attraction => attraction.images.length !== 0)
    
  )

  filteredData = filteredData.map(countryAttractionsArray =>
    countryAttractionsArray.slice(0, 6)
  );

  let mongoFormattedData = filteredData.map(countryAttractionsArray =>
    countryAttractionsArray.map(attraction => {
      return {
        name: attraction.name,
        description: attraction.intro,
        snippet: attraction.snippet,
        image: {
          src: attraction.images[0].source_url,
          caption: attraction.images[0].caption
        }
      }
    }))
  

  

  countries.forEach(async (country, index) => {
    country.attractions = mongoFormattedData[index];
    await country.save();
  }) 

  




  

  res.json('ok');
})

module.exports = router;