const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Database connection
const dbname = 'database name';
const db = (`mongodb://localhost:27017/${dbname}`);
mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true})
.then(()=>{console.log('Database connected..')})
.catch(err =>{console.log('error'+err)});
//End Database conncetion

// Model Start
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');     //Password Hashing function
var userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null); //use the hashing function
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);   //Password Compare
};

module.exports = mongoose.model('User', userSchema);

//Model End

// Route Start
router.get('/signup', (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken() }); // use token to authenticate-> require csurf
});

router.post('/signup', passport.authenticate('local.signup', {    //Use Passport for Authenticate->require passport
    successRedirect: '/user/signin',
    failuerRedirect: '/user/signup',
    failuerFlash: true
}));
//Route End

app.listen(3000,()=>{
console.log('Server is running on port 3000 ...!');
});