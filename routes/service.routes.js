/*  Главный файл роутов. Именно сюда стучится клиент и просит данные*/
const { Router } = require('express');
const { model, Types } = require('mongoose');
const auth = require('../middleware/auth.middleware');
const CountryModel = require('../model/County.model');
const UserModel = require('../model/User.model');
const AttractionSchema = require('../model/Attraction.schema');
const config = require('config');

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
          _id: country._id,
          en: country.en,
          ru: russianCountries[index],
          es: spanishCountries[index]
        }
      })

    

   res.json(responseCountries);
   


    } else {
      res.status(400).json({ message: 'Something went wrong, try again' });
    }

   

} catch (error) {
  console.log(error.message)
}

})


router.post('/vote', auth, async (req, res) => {
try {
  if (!req.body.auth) {
    return res.status(401).json({ message: 'Authorisation required'})
  }

  const { userId } = req.user;
  const { countryId, lang, attractionId, value } = req.body;

  const country = await CountryModel.findOne({ _id: countryId });
  const ruCountry = country[lang];
  const langIndex = ruCountry.attractions.findIndex(attraction =>
    String(attraction._id) === attractionId);
  const enAttraction = country.en.attractions[langIndex];

  const user = await UserModel.findOne({ _id: userId }).lean();
  
// if already voted
  const ratingIndex = enAttraction.rating.findIndex(rateObject =>
    String(rateObject.userId) === String(userId))
  
  if (ratingIndex >= 0) {
    enAttraction.rating[ratingIndex].value = Number(value);
    
  } else {

    

    const ratingObject = {
      value: Number(value),
      userId: userId,
      avatar: user.avatar,
      username: user.name
    }
    enAttraction.rating.push(ratingObject)
 }

  
      await country.save();

  let plainCountry = await CountryModel.findOne({ _id: countryId }).lean();
  
  let baseCountry = plainCountry.en;
  baseCountry = {
    ...baseCountry,
    attractions: baseCountry.attractions.map(attraction => 
    {
      return {
        ...attraction,
        rating: attraction.rating.map(rateObject => {
          return {
            ...rateObject,
            avatar: `${config.get('baseUrl')}/${rateObject.avatar}`
          }
        })
      }
      
      }
      )
  }



  
  const russianCountry = {
    ...baseCountry,
    name: country.ru.name,
    capital: {
      ...baseCountry.capital,
      name: country.ru.capitalName
    },
    image: {
      ...baseCountry.image,
      caption: country.ru.imageCaption
    },
    description: country.ru.description,
    snippet: country.ru.snippet,
    attractions: baseCountry.attractions.map((attraction, index) => {
      return {
        ...attraction,
        name: country.ru.attractions[index].name
      }
    })
  }

  const spanishCountry = {
    ...baseCountry,
    name: country.es.name,
    capital: {
      ...baseCountry.capital,
      name: country.es.capitalName
    },
    image: {
      ...baseCountry.image,
      caption: country.es.imageCaption
    },
    description: country.es.description,
    snippet: country.es.snippet,
    attractions: baseCountry.attractions.map((attraction, index) => {
      return {
        ...attraction,
        name: country.es.attractions[index].name
      }
    })
  }


  let responseCountry = {
    en: baseCountry,
    ru: russianCountry,
    es: spanishCountry
  }
  


  res.json(responseCountry)


} catch (error) {
  console.log(error.message)
}


  /*
  Юзер выбрал оценку 5. Сервер получает id достопримечательности, токен юзера, выбранный язык
  Нужен id страны - самый верхний, не внутри языков
  */
})






module.exports = router;


