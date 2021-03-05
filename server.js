const express = require('express');
const config = require('config');


const server = express();


const PORT = config.get('port') || 5000;


async function start() {

  try {
    /*
      await mongoose.connect(config.get('mongoUri'), {

          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
      }) */

      server.listen(PORT, () => console.log(`Server has been started on ${PORT}...`));
      
  } catch (error) {
      console.log(error);
      process.exit(1);
  }


  
}

start();


