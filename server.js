const express = require('express');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');


const server = express();
server.use(express.json({ extended: true }));

const PORT = config.get('port') || 5000;

server.use('/api/request', require('./routes/requests.routes'));
server.use('/api/service', require('./routes/service.routes'));


async function start() {

  try {
    
      await mongoose.connect(config.get('testUri'), {

          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
      }) 

      server.listen(PORT, () => console.log(`Server has been started on ${PORT}...`));
      
  } catch (error) {
      console.log(error);
      process.exit(1);
  }


  
}

start();


