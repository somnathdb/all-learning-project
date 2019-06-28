var express = require('express');
var router = express.Router();
// var Cart = require('../models/cart');

//var Product = require('../models/products');


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});
module.exports = router;
