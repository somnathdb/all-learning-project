var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn,function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.use('/', notisLoggedIn, function (req, res, next) {
    next();
});
router.get('/signup', (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken() });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/signin',
    failuerRedirect: '/user/signup',
    failuerFlash: true
}));



router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken() });
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failuerRedirect: '/user/signin',
    failuerFlash: true
}));






module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
function notisLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}