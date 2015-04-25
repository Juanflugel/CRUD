
var express = require('express');
var multer  = require('multer');
var app = express();
var bodyParser = require('body-parser'); // parsear los datos de los inputs 
var mongoose = require('mongoose');// libreria para conectar DB y hacer CRUD,esquemas y vaidaciones
var Primo = require('./models/Contacto');
mongoose.connect('mongodb://localhost/primo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('conectado primo');
});


app.use(express.static("public"));
app.use(bodyParser.json());

// experimento
app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));


// experimento

app.get('/primo', function (req,res){
	Primo.find(function (error,results){
		res.json(results);
	});
});

app.post('/primo', function (req,res){
	var ito = new Primo(req.body);
	Primo.create(req.body,function (err,ito){
		res.json(ito);
	});
});

app.delete('/primo/:id', function (req,res){
	var id = req.params.id;
	Primo.findByIdAndRemove(id,function (err){
		if (err)
			res.send(err);
		res.json({ message: 'Se ha borrado el ID' });
	});
});

app.get('/primo/:id',function (req,res){
	var id = req.params.id;
	Primo.findById(id,function (err, results){
		if (err)
			res.send(err);
		res.json(results);
	});
});

app.put('/primo/:id',function (req,res){
	var id = req.params.id;
	console.log('este es el id a actaualizar',id);
	Primo.findByIdAndUpdate(id,
		{nombre:req.body.nombre,numero:req.body.numero},
		{new:true},
		function (err,results){
			res.json(results);
		});
});

// todo esto funciona bien

/*Handling routes.*/

app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

/*Run the server.*/

app.listen(1800);
console.log(' servidor se ejecuta en el http://localhost:1800, con modelo separado');

