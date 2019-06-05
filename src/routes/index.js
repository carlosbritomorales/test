const router = require('express').Router();
const passport = require('passport');

const Service = require('../models/services');
const User = require('../models/user');

router.get('/', async(req, res) => {
    const services = await Service.find();
    res.render('index',{
        services
    });
});

router.get('/client', function(req, res, next) {

    if (req.isAuthenticated()) {
        console.log(req.user.isServiceProvider());
        res.render('client')
    } else {
        console.log(req.user.name);
        res.sendStatus(403) // Forbidden
    }
})

router.get('/main', function (req, res, next) {
    //console.log(req.user.name);
    res.render('main');
});

router.get('/', function (req, res, next) {
    //console.log(req.user.name);
    res.render('index');
});

router.get('/myservices', async(req, res) => {
    const services = await Service.find();
    res.render('myservices',{
        services
    });
});

router.get('/searchservices', async(req, res) => {
    const services = await Service.find();
    res.render('searchservices',{
        services
    });
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

  router.get('/delete/:id', async (req, res, next) => {
    let { id } = req.params;
    await Service.remove({_id: id});
    res.redirect('/myservices');
  });

router.post('/add', async(req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.redirect('/myservices');
    //console.log(new Service(req.body));
    //res.send('received');
});

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

router.use((req,res,next) => {
    isAuthenticated(req,res,next);
    next();
});

router.get('/profile', (req, res) => {
    const services = Service.find();
    //res.render('profile');
    res.render('profile',{
        services
    });
});

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;