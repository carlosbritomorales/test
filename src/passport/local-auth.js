const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    //console.log(user);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({'email': email})
    console.log(user)
    if(user) {
      return done(null, false, req.flash('signupMessage', 'El correo ya se encuentra registrado.'));
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.name = req.body.name;
      
      for (var i = 0; i < 5; i++) {
        //newUser.service.name = i;
        newUser.service = i;
      };

      newUser.service1 = "ninguno";
      newUser.service2 = "ninguno";

      if(req.body.usertype=="on"){
        //console.log("state: %s",req.body.usertype);
        newUser.usertype="services-on"
      }else{
        //console.log("state: %s",req.body.usertype);
        newUser.usertype="services-off"
      }
      newUser.birthdate = req.body.birthdate;
      console.log(newUser)
      await newUser.save();
      return done(null, newUser, req.flash('userdataMessage', newUser.name));
    }

  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({email: email});

    if(!user) {
      return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }

    if(user.usertype == "services-on"){
      console.log("Eres Prestador de Servicios");
    }else{
      console.log("Eres Cliente");
    }

    //console.log(user.name);

    return done(null, user, req.flash('userdataMessage', user.name));
    //return done(null, user);
  }));

  
  