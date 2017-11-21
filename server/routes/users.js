const express = require('express'),
flash = require('req-flash'),
User = require('../models/user')


module.exports = (() => {
'use strict';

const router = express.Router();

/* User listing endpoint */
router.get('/list/all', (req,res) => {
   
User.find({}, function(err,users){
  if (err) throw err;
  else {
    var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    res.send(JSON.stringify(userMap));         
  }
})
})


/*endpoint to provide partial list of useres based on keyword search*/
router.get('/list/:keyword', (req,res) => {
console.log("Listing users who matched the search")
//res.json({message:"User list here!"})
User.find({username: {$regex: req.params.keyword}}, function(err, users) {
if (err) throw err;
var userMap = {};

users.forEach(function(user) {
  userMap[user._id] = user;
});
res.send(JSON.stringify(userMap));

})
});


/* User registration API endpoint */
router.post('/register', (req, res) => {
// Confirm passwords match.

/* if (req.body.password !== req.body.passwordConf) {
const err = new Error('Passwords do not match!')
err.status = 400
throw err
}*/

// If user already exists...
User.find({email : req.body.email}, function(err, docs)  {

if(docs.length){
  const err = new Error('User already exists!')
  err.status = 400
  res.json({ message: 'User already exists!' })
  
  //res.locals.messages=req.flash()
  //res.render('register',{title: "Register"});
}
else{

const newUser = new User({
  displayName: req.body.displayName,
  email: req.body.email,
  username: req.body.username,
  password: req.body.password,
  question1: req.body.question1,
  question2: req.body.question2,
  question3: req.body.question3,
  createdOn: new Date
})



console.log("newUser created");

// Attempt to create the new user in the database.
User.create(newUser, (err) => {
  console.log(newUser)
  if (err) {
      throw err
  }
  res.status(200).send();
  //res.locals.messages= req.flash();
  //res.redirect('/login');
  //res.json({ message: 'User registered successfully.' })
})
}
})
})

/*endpoint of read a single user- by Jieli*/
router.get('/:id',(req,res)=> {
User.findOne({_id: req.body.id},(err,user)=> {
console.log('Endpoint: Read a user')
if (err) throw err;
else {
  res.send(JSON.stringify(user));
  //res.send(JSON.stringify(username))
  console.log('read a user success')
  //res.status(304).send()
  //res.json({message: 'user found'});
}
})

});

/*endpoint of delete a single user -by jieli*/ 
router.get('/delete/:id', (req, res) => {
User.remove(User.findById(req.body.id), (err,user) => {
  console.log('Endpoint: Delete a user')
      if(err){
        console.log('Error in delete a user');
        res.status(204).send();
      }
      else {
        console.log('delete a user success'); 
        res.status(200).send();
        
      }
})
});//End of Endpoint

router.post('/reset', function(req, res){
var password = req.body.password;
var password2 = req.body.password2;

req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

var errors = req.validationErrors();

  if(errors){
      res.render('login',{
          errors:errors
      });
  } else {
      res.redirect('/login');
      
  }
});

return router;
})();