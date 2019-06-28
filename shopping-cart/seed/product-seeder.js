var Product = require('../models/products');
var mongoose = require('mongoose');


var dbName = 'shopping';
var db = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => { console.log('DataBase Connected SuccessFully!!') })
    .catch(err => { console.log('Error While Connection ' + err) });


var products = [
    new Product({
        newimagePath: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        title: 'Good Game',
        description: 'Awesome Fabrics!!!',
        price: 10
    }),
    new Product({
        newimagePath: '',
        title: 'Nice Game',
        description: 'Awesome Fabrics!!!',
        price: 20
    }),
    new Product({
        newimagePath: '/images/product_images/3.jpg',
        title: 'Most Faemus Game',
        description: 'Awesome Fabrics!!!',
        price: 30
    }),
    new Product({
        newimagePath: '/images/product_images/4.jpg',
        title: 'Every One Play',
        description: 'Awesome Fabrics!!!',
        price: 40
    }),
    new Product({
        newimagePath: '/images/product_images/5.jpg',
        title: 'So Much Like ',
        description: 'Awesome Fabrics!!!',
        price: 50
    })

];

var done = 0;
for (i = 0; i < products.length; i++) {
    products[i].save(function(err,result){
    done++;
if(done === products.length){
    exit();
}
    });
}
function exit(){
    mongoose.disconnect();
}
