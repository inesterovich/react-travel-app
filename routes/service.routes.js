/*  Главный файл роутов. Именно сюда стучится клиент и просит данные*/
const { Router } = require('express');
const CountryModel = require('../model/County.model');

const router = Router();


// /api/service/country

router.post('/country', async (req, res) => {
/* Клиент делает запрос на сервер,
 на этот запрос сервер должен найти информацию о стране, отдать информацию о стране.
 
 */
  
  try {
    const { name } = req.body;

    const country = await CountryModel.findOne({ name });

    if (country) {
      res.json({ country });
    } else {
      res.status(400).json({ message: 'Country not found' });
    }

   

} catch (error) {
  console.log(error.message)
}

})


module.exports = router;


