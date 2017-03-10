var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});


var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;

