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
    

    const countries = await CountryModel.find({});

    if (countries) {
      res.json( countries );
    } else {
      res.status(400).json({ message: 'Something went wrong, try again' });
    }

   

} catch (error) {
  console.log(error.message)
}

})





module.exports = router;


