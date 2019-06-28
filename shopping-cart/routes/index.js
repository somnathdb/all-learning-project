var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');


/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find((err, docs) => {
    res.render('index', { title: 'Shopping Cart', products: docs });
  });
});

router.get('/add-to-cart/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);

    res.redirect('/');
  });
});


router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })
});


router.get('/checkout', function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('checkout',{total:cart.totalPrice});
});





module.exports = router;
