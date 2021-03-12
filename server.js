const express = require('express');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');


const server = express();

server.use(cors())
server.use(express.json({ extended: true }));
server.use(express.urlencoded({ extended: true}))



server.use('/uploads', express.static('uploads'));
server.use('/api/request', require('./routes/requests.routes'));
server.use('/api/service', require('./routes/service.routes'));
server.use('/api/auth', require('./routes/auth.routes'));

/*
if (process.env.NODE_ENV === 'production') {
    
    server.use('/', express.static(path.join(__dirname, 'client', 'build')));
    server.get('*', (req, res) => { 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
    
}
*/


const PORT = config.get('port') || 5000;

async function start() {

  try {
    
      await mongoose.connect(config.get('mongoUri'), {

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


