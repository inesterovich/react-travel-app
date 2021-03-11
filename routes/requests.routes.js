
const countries = require('../initialData.json');
const countryCodes = require('./countryCodes.json').slice().sort();
const countrySampleTexts = require('./countryTextsSample.json');
const capitalDataSample = require('./capitalDataSample2.json');
const countryCapitals = require('../country_capitals.json');
const attractionsSampleResponse = require('../routes/attractions_sample_response.json');
const attractionsDataSample = require('./attractionsDataSample.json');

const fetch = require('node-fetch');
const { Router, response, request } = require("express");
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

 

  if (typeof config.authData === 'object') {

    let {
      authData,
      type,
      baseUri,
      endPoint,
      searchBy,
      count,
      fields,
      exclude,
      trigram,
      distance,
      sortBy } = config;
    
    
    if (type) {
      type = `type=${type}`
    } else if (!type) {
      type = '';
    } else {
      throw new Error('type shoud be a string with value city or country')
    }
    
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

    if (trigram && Array.isArray(trigram)) {
      trigram = `annotate=trigram:${trigram[0].replace(' ', '_')}&trigram=${trigram[1]}`
    } else if (!trigram) {
      trigram = '';
    } else {
      throw new Error('trigram should be an array with name and condition')
    }

    
    const queryString =
      `${baseUri}/${endPoint}.json?${type}&${searchBy}&${count}&${fields}&${trigram}`
        .replace('?&', '?').replace('&&', '&');
    
 //   console.log(queryString);
    
    const request = fetch(queryString, { headers: authData});
    return request;
  } else if (config.authData === '') {

    let {
      baseUri,
      searchBy

    } = config;

    const request = fetch(`${baseUri}/${searchBy}`);

    return request; 

    

  }

  // В конечном итоге, от функции я ожидаю, что она будет возвращать готовый объект для функции fetch
  

}


router.post('/getData', async (req, res) => {

  // Искать столицы надо по code в restCountries. 
  // Искать инфу о стране надо по её имени. Или 10 запросов по code. 
 
  try {

    
  const requests = countryCodes.map(countryCode => {
    const config = {
      authData: '',
      baseUri: 'https://restcountries.eu/rest/v2/alpha',
      searchBy: countryCode
    }

    return apiRequest(config);


  })
  const apiResponse = await Promise.all(requests);
  const apiData = await Promise.all(apiResponse.map(response => response.json()));

  let initialCountryData = apiData.map((country, index) => {

    return {
      code: countryCodes[index],
      name: country.name,
      flag: country.flag,
      capital: {
        name: country.capital
      },
      currency: country.currencies[0]
    }
  })

    /*
    
    const countryTextRequests = initialCountryData.map((country, index) => {
      const config = {
        authData: authHeaders,
        type: 'country',
        baseUri: 'https://www.triposo.com/api/20201111',
        endPoint: 'location',
        searchBy: ['countrycode', index === 4 ? 'uk': country.code],
        fields: ['name','intro', 'images', 'coordinates', 'snippet', 'properties'],
        count: 1,
        
      }

      return apiRequest(config);
    })

    const countryTextsResponse = await Promise.all(countryTextRequests);
    let countryTexts = await Promise.all(countryTextsResponse.map(response =>
      response.json().then(data => data.results)
    
    ));

    countryTexts = countryTexts.flat();

    */

    
    let countryTexts = countrySampleTexts;


  
    /*
    
    
    let capitalDataRequests = initialCountryData.map((country, index) => {
      const config = {
        authData: authHeaders,
        type: 'city',
        baseUri: 'https://www.triposo.com/api/20201111',
        endPoint: 'location',
        fields: ['name', 'coordinates'],
        count: 1,
        trigram: [country.capital.name, '>=0.7']
      }

      return apiRequest(config);
    })

    let capitalDataResponse = await Promise.all(capitalDataRequests);
    let capitalData = (await Promise.all(capitalDataResponse
      .map(response => response.json().then(data => data.results)))).flat();
    */
    
    let capitalData = capitalDataSample;


 /*
    
    
    let countryAttractionsRequests = initialCountryData.map((country, index) => {
      const config = {
        authData: authHeaders,
        baseUri: 'https://www.triposo.com/api/20201111',
        endPoint: 'poi',
        searchBy: ['countrycode', index === 4 ? 'uk' : country.code ],
        count: 60,
        fields: ['id', 'name', 'images','location_id'],
        
      }

      return apiRequest(config);
    })

    let countryAttractionsResponse = await Promise.all(countryAttractionsRequests);
    let countryAttractions = await Promise.all(countryAttractionsResponse.map(response => response.json().then(data => data.results)));
        */
    
   // return res.json(countryAttractions);
    
    
    let countryAttractions = attractionsDataSample;
    

    countryAttractions = countryAttractions.map(country =>
      country
        .map(attraction => {
    
          return {
            ...attraction,
            images: attraction.images.filter(image => image.caption !== null &&
              image.caption !== 'image')
          }
        }).filter(attraction => attraction.images.length !== 0).slice(0, 10));
    
    let mongoFormattedAttractions = countryAttractions.map(country =>
      country.map(attraction => {
        return {
          name: attraction.name,
          url: attraction.images[0].source_url,
          
        }
      }))  

    /*  Ends here*/

    let allCountryInfo = initialCountryData.map((country, index) => {
      return {
        ...country,
        code: index === 4 ? 'uk' : country.code,
        coordinates: [
          countryTexts[index].coordinates.latitude,
          countryTexts[index].coordinates.longitude,
        ],
        capital: {
          ...country.capital,
          coordinates: [
            capitalData[index].coordinates.latitude,
            capitalData[index].coordinates.longitude,
          ]
        },
        attractions: mongoFormattedAttractions[index],
        name: countryTexts[index].name,
        description: countryTexts[index].intro,
        snippet: countryTexts[index].snippet,
        image: {
          url: countryTexts[index].images[0].source_url,
          caption: countryTexts[index].images[0].caption
        }

        
      }
    })

   CountryModel.create(allCountryInfo);

 return res.json(allCountryInfo[1]);
    
  } catch (error) {
    console.log(error.message)
  }



})

router.post('/test', async (req, res) => {
  try {
    

    const countries = await CountryModel.find({}).lean();

    const countriesOnly = countries.map(country =>
      country.attractions.map(attraction => {
        return {
          name: attraction.name,
        }
      })
    
    )

    if (countries) {
      res.json( countriesOnly );
    } else {
      res.status(400).json({ message: 'Something went wrong, try again' });
    }

   

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



module.exports = router;