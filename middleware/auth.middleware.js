const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

  try {

    let token;
    if (req.headers.authorization) {
     token = req.headers.authorization.split(' ')[1];
      }
        

        if (!token) {
          req.body.auth = false;
          return next()
        }

      

        const decoded = jwt.verify(token, config.get('jwtSecret'));
     

        req.user = decoded;
        req.body.auth = true;
        next();
        

    } catch (error) {
        res.status(401).json({ message: error.message})
    }


}