const { Router } = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const UserModel = require('../model/User.model');
const config = require('config');
const path = require('path');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploads = 'uploads';

    if (!fs.existsSync(uploads)) {
      fs.mkdirSync(uploads);
    }
    
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage});

const router = Router();

router.post(
  '/register',
  upload.single('avatar'),
  [check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
 ],
  
  async (req, res) => {
    try {

      
      const { email, password, avatar } = req.body;

      const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Incorrect data for registation'

                });
            }

      
      

        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            return res.status(400).json({
                message: 'This user already exists'
            })
        }

      const hashedPassword = await bcrypt.hash(password, 12);
     
      const user = new UserModel(
        {
          email,
          password: hashedPassword,
          avatar: req.file.path.replace('\\', '/')
        }
      );

      await user.save();

      res.status(201).json({ message: 'Registation completed successfully' });
} catch (error) {
  res.status(500).json({ message: `Error: ${error.message} was catched in ${__filename}` });
}
  })

router.post(
    '/login',
    [check('email', 'Incorrect email').isEmail(),
     check('password', 'You forget to enter a password').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Incorrect data for login'

                });
            }

            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Password is incorrect' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'), {
                expiresIn: '14 days'
            }
            );
          
          const avatarLink = `${config.get('baseUrl')}/${user.avatar}`

         return res.json({
            token,
            userId: user.id,
            avatar: avatarLink

          });
        
        } catch (error) {
          res.status(500).json({ message: `Error: ${error.message} was catched in ${__filename}` });
          
  }


}) 

module.exports = router;
