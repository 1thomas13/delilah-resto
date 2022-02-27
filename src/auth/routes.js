const express = require('express')
const router = express.Router()
const passport = require('passport');

router.use(express.json())


require("./controllersGoogle")


  
  const isLoggedIn = (req, res, next) => {
    console.log(req.user)
      if (req.user) {
        
        next();
      } else {
        res.sendStatus(401);
      }
    }
  
  router.get('/failed', (req, res) => res.send('Falla al loguearse'))
  
  // In this route you can see that if the user is logged in u can acess his info in: req.user
  router.get('/google/good', isLoggedIn, (req, res) => {
    console.log(req);
    //return res.send(req.user);
    return res.send(`Bienvenido ${req.user.displayName}!<br>Registrado con la cuenta ${req.user.emails[0].value} <hr>`);
  
  }
  );
  
  // Auth Routes
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  
  router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req.user.displayName);
      // console.log(res);
      res.redirect('/auth/google/good');
      //cambiar la ruta
    }
  );

module.exports = router
