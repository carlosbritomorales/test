const router = require('express').Router();
const path = require('path');

const passport = require('passport');

const Moment = require('moment');
const Service = require('../models/services');
const User = require('../models/user');
const Request = require('../models/request');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/services', async(req, res) => {
  
  const services = await Service.find();

  res.render('services',{
      services
  });
});

router.get('/profile', (req, res) => {
  const services = Service.find();
  //res.render('profile');
  res.render('profile',{
      services
  });
});

router.get('/main', function (req, res, next) {
  //console.log(req.user.name);
  res.render('main');
});

//Rutas relacionadas con Manejo de Usuarios [Registro (Signup), Inicio de sesión (Signin) y (Logout)]
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin' ,{
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

//Rutas relacionadas con Manejo de Servicios (Agregar, Eliminar y Editar)
router.get('/myservices', async(req, res) => {
  const services = await Service.find();

  res.render('myservices',{
      services
  });
});

router.post('/add', async(req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.redirect('/myservices');
  //console.log(new Service(req.body));
  //res.send('received');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Service.remove({_id: id});
  res.redirect('/myservices');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const service = await Service.findById(id);
  service.status = !service.status;
  await service.save();
  res.redirect('/myservices');
});

router.get('/editService/:id', async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  console.log(service)
  res.render('editService', { service });
});

router.post('/editService/:id', async (req, res, next) => {
const { id } = req.params;
await Service.update({_id: id}, req.body);
res.redirect('/myservices');
});

//Rutas relacionadas con Busqueda de Servicios
router.get('/searchService', async(req, res) => {
  const users = await User.find();
  const services = await Service.find();

  res.render('searchService',{
      users,
      services
  });
});

router.get('/editsearchservice/:id', async (req, res, next) => {
  const users = await User.findById(req.params.id);

  const userss = await User.find();
  const services = await Service.find();

  res.render('editsearchservice',{
      users,
      userss,
      services
  });

  console.log(users)
  //res.render('editsearchservice', { users });
  //res.render('searchService', { users });
});

router.post('/editsearchservice/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/searchService');
});

router.get('/deletesearch/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.remove({_id: id});
  res.redirect('/searchService');
});

router.post('/addsearch', async(req, res) => {
  const user = new User(req.body);
  await user.save();
  res.redirect('/searchService');
  //console.log(new Service(req.body));
  //res.send('received');
});

//Rutas relacionadas con Solicitudes de Servicios
router.get('/myrequest', async(req, res) => {

  const users = await User.find();
  const services = await Service.find();
  const request = await Request.find();

  var moment = require('moment');

  //exports.myrequest = function(req, res) {
  
      res.render('myrequest', { 
          moment: moment,
          users,
          services,
          request,
      });
  
  //}

});

router.get('/myrequest/:id', async (req, res, next) => {
  const request = await Request.findById(req.params.id);
  console.log(request)
  res.render('myrequest', { request });
});

router.post('/myrequest/:id', async (req, res, next) => {
const { id } = req.params;
await Request.update({_id: id}, req.body);
res.redirect('/myrequest');
});

router.post('/addrequest', async(req, res) => {
  const request = new Request(req.body);
  await request.save();
  res.redirect('/myrequest');
});

router.get('/requestservice', async(req, res) => {
  
  const users = await User.find();
  const services = await Service.find();
  const request = await Request.find();

  const moment = require('moment');

  res.render('requestservice',{
      request,
      users,
      services,
      moment,
  });

});

router.post('/rateservice/:id', async (req, res, next) => {
  const { id } = req.params;
  await Service.update({_id: id}, req.body);
  res.redirect('/myrequest');
  });

router.get('/requestservice/:id', async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  const services = await Service.find();
  const request = await Request.find();
  const moment = require('moment');
  console.log(service)
  res.render('requestservice', { request, service, services, moment: moment });
});

router.post('/requestservice/:id', async (req, res, next) => {
  const { id } = req.params;
  const request = await Request.find();
  const services = await Service.find();
  await Service.update({_id: id}, req.body);
  res.render('requestservice', { request, services, moment: moment });
  //res.redirect('/requestservice');
});
//

module.exports = router;
