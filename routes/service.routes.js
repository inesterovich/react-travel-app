/*  Главный файл роутов. Именно сюда стучится клиент и просит данные*/
const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const CountryModel = require('../model/County.model');

const router = Router();




// /api/service/country



router.post('/countries', auth, async (req, res) => {

  try {
    

    const countries = await CountryModel.find({}).lean();

    if (countries) {
      let baseCountries = countries.map(country => country.en);

      const { auth } = req.body;

      if (!auth) {
        baseCountries = baseCountries.map(country =>
          country.attractions
            .map(attraction => {
              const filtredObject = {
                ...attraction
              }
              delete attraction.rating;
              return filtredObject
            }))
  
      }
      const russianCountries = countries.map((country) => {
        return {
          ...country.en,
          name: country.ru.name,
          capital: {
            ...country.en.capital,
            name: country.ru.capitalName
          },
          image: {
            ...country.en.image,
            caption: country.ru.imageCaption
          },
          description: country.ru.description,
          snippet: country.ru.snippet,
          attractions: country.en.attractions.map((attraction, index) => {
            return {
              ...attraction,
              name: country.ru.attractions[index].name
            }
          })
        }
      })

      const spanishCountries = countries.map((country) => {
        return {
          ...country.en,
          name: country.es.name,
          capital: {
            ...country.en.capital,
            name: country.es.capitalName
          },
          image: {
            ...country.en.image,
            caption: country.es.imageCaption
          },
          description: country.es.description,
          snippet: country.es.snippet,
          
          attractions: country.en.attractions.map((attraction, index) => {
            return {
              ...attraction,
              name: country.es.attractions[index].name
            }
          })
        }
      })

      const responseCountries = countries.map((country, index) => {
        return {
          en: country.en,
          ru: russianCountries[index],
          es: spanishCountries[index]
        }
      })

    

      return res.json(responseCountries);
      


    } else {
      res.status(400).json({ message: 'Something went wrong, try again' });
    }

   

} catch (error) {
  console.log(error.message)
}

})






module.exports = router;


