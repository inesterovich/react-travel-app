/*  Главный файл роутов. Именно сюда стучится клиент и просит данные*/
const { Router } = require('express');
const CountryModel = require('../model/County.model');

const router = Router();




// /api/service/country

router.post('/countries', async (req, res) => {
/* Клиент делает запрос на сервер,
 на этот запрос сервер должен найти информацию о стране, отдать информацию о стране.
 
 // 
 */
  
  try {
    

    const countries = await CountryModel.find({}).lean();

    if (countries) {
      const baseCountries = countries.map(country => country.en);
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
            ...country.ru.image,
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


