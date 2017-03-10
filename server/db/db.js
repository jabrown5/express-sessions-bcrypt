var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/villain';

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
	console.log('connected to' + connectionString);
})

mongoose.connection.on('error', function() {
	console.log('MongoDB error ' + error);
})

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected from ' + connectionString);
})
