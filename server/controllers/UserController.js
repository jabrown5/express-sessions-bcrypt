var express = require('express');
var router = express.Router();
var User = require('../models/UserS')
var bcrypt		= require('bcryptjs')

// This denotes that every route in this controller starts
// with /user

// app.use(/user) which is defined in our app.js

router.get('/login', function(req, res){
  console.log(req.session)
  res.render('login', {})
})

router.post('/login', function(req, res){

	// FIRST, QUERY THE DB TO FIND THE USER

  // var loginUsername = req.body.username;
  // var password = req.body.password;

  	User.findOne({username: req.body.username}, function(err, user){

    	if(user){
    		//IF THERE IS A USER, UNHASH THEIR PASSWORD

	    	bcrypt.compare(req.body.password, user.password, function(err, match) {
	    		// this method returns returns true or false
	    		// if true, the passwords match
	    		if(match) {
	    			// SET THE SESSION & DIRECT TO WHERE EVER
	    			req.session.username = user.username
			    	req.session.userId   = user.id
			    	req.session.loggedIn = true

			    	//res.send('Welcome Back.  You are logged in')
			    	res.redirect('/villains')

	    		} else {

	    			// SEND MESSAGE FOR WRONG USERNAME OR PASSWORD
			      	//res.redirect('/user/registration')
			      	res.render('login', {message: 'Username or Password is incorrect'})
			    }
    		})
    	} else {
    		res.render('Username does not exist')
    	}
  	})
})



router.get('/register', function(req, res){
    console.log(req.session, ' this is our session object')
  res.render('register', {})
})

router.post('/register', function(req, res){

	// CHECKING THE DB TO SEE IF THERE IS ALREADY A USER.
	User.findOne({username: req.body.username}, function(err, user){

		if (user === null){
			// REGISTER THE USER
			// SALT AND HASH THE USER PASSWORD
			bcrypt.genSalt(10, function(err, salt){
				// NOW CREATE THE HASH
				bcrypt.hash(req.body.password, salt, function(err, hash){
					// SAVE USER IN THE DB
					// MAKE AN OBJECT W/ THE CORRECT INFO TO PUT IN DB
					var userDbEntry = {};
					userDbEntry.username = req.body.username ;
					userDbEntry.password = hash ;

					// NOW WE CAN USE MODEL TO CREATE ENTRY
					User.create(userDbEntry, function(err, user){
						if(user){
							// IF USER WAS CREATED, INITIATE THE SESSION
							// CONFIRMING THAT WE DID ACTUALLY CREATE THE USER
							req.session.username 	= user.username ;
							req.session.userId 		= user.id ;
							req.session.isLoggedIn 	= true;

							res.send('YOU ARE LOGGED IN');
						} else {
							res.send('THERE WAS AN ERROR W/ YOUR REGISTRATION')
						}
					})
				})
			})
		} else {
			// SEND A MESSAGE THAT USERNAME IS ALREADY TAKEN
			res.render('register', {message: 'username is taken'})
		}
	})


	// bcrypt.genSalt(10, function(err, salt){
	// 	bcrypt.hash(req.body.password, salt, function(err, hash){
	// 		var hashedPasswordObject = {};
	// 		hashedPasswordObject.username = req.body.username ;
	// 		hashedPasswordObject.password = hash ;

	// 		User.create(hashedPasswordObject, function(err, user){
	// 		    if(user){
	// 		      	req.session.username = user.username
	// 		      	req.session.userId   = user.id
	// 		      	req.session.loggedIn = true

	// 		      	res.redirect('/villains')
	// 			} else {
	// 		    	res.render('register', {message: 'username was taken'})
	// 			}
	// 		})
	// 	})
	// })

})



router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/user/login')
  })
})









module.exports = router