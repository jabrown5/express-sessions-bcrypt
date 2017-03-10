var express = require('express');
var router 	= express.Router();
var Villain = require('../models/Villain');

router.get('/villains', function(request,response){
	Villain.find(function(err, villains){
		console.log(villains)
		response.render('home', {villainsArray: villains});
	})
});


router.post('/villains', function(request,response){
	var villain = new Villain({	name: request.body.name,
								movie: request.body.movie,
								power: request.body.power,
								height: request.body.height});
	villain.save();
	response.redirect('./villains')
});

router.patch('/villains/:id', function(request, response){
	var id = request.params.id;
	var newInfo = request.body;

	Villain.findById(id, function(err, villain){
		villain.name 	= newInfo.name;
		villain.movie	= newInfo.movie;
		villain.power	= newInfo.power;
		villain.height	= newInfo.height;
		villain.save();
		response.send('Success');

	});	
})

router.delete('/villains/:id', function(request, response){
	var id = request.params.id;
	console.log(id);
	Villain.findById(id, function(err, villain){
		villain.remove();
		response.send('Success');

	});
});



module.exports = router;