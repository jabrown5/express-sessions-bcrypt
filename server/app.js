var express 	= require('express');
var app 		= express();
var server 		= require('http').createServer(app);
var bodyParser 	= require('body-parser');
var path 		= require('path');
var hbs 		= require('hbs');
var mongoose 	= require('mongoose');
var session		= require('express-session');
var bcrypt		= require('bcryptjs')

require('./db/db');

app.use(session({
	secret: "this is our secret salt",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}));

// // IS NOT WORKING 
// var authenticateRoute = function(req, res, next){
// 	if (req.originalUrl === '/user/login' || req.originalUrl === '/user/registration'){
// 		next()
// 	} else if (!req.session.loggedIn) { // there is NOT a loggedIn property
// 			res.redirect('/user/registration')
// 	} else {
// 		next()
// 	}
// }
// }


// // use this before your controller
// app.use(authenticateRoute);





var VillainController = require('./controllers/VillainController');
var UserController = require('./controllers/UserController');


app.use(bodyParser.urlencoded({extended: true}));


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');


app.use(express.static(path.join(__dirname, 'public')));

// any request to the address /villains will use the Villain controller
app.use('/', VillainController);
app.use('/user', UserController);





server.listen(3000, function(){
	console.log("The cats are listening on port 3000!!!");
})