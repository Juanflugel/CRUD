var mongoose = require('mongoose');

var primoSchema = mongoose.Schema({ 
	nombre:String,
	numero:Number
});

var Primo = mongoose.model('Primo',primoSchema);

module.exports = Primo;