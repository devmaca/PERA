'use strict'

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

/*Middelware sesiones*/
var session_admin = require('./sesiones/sesionadmin.js');
var session_doce = require('./sesiones/sesiondoce.js');

var routes_home = require('./routes_home.js');
var routes_doce = require('./routes_doce.js');
var routes_admin = require('./routes_admin.js')

var formData = require("express-form-data");
const os = require("os");
const path = require('path');
const fs = require('fs');
var pathObj = path.parse(__filename);
console.log(pathObj)
var pool =require('./src/database.js');
pool.query("select * from admin",[],function(err,result){
	console.log('el resultado es : ',result)
})

// fs.readFile('message.pug', 'utf8',(err,file) => {
//   if (err) throw err;
//   console.log(file);
// });
// fs.unlink('public/file_upload/d1RaWd0gvEBYtSlZIFrasM5Z.pdf', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });


/* Integrando motor de vistas pug */
app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine
app.use("/public",express.static('public'));// Servir archivos estaticos para el sitio

// para manejar sesiones
app.use(session({
	secret:"keyboard cat",
	resave: false,
	saveUnitialized: false
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.set('port', process.env.PORT || 3000);

app.get("/", function(req, res){
	
	res.render('index');
	
})

console.log("Nombre de la máquina -> " + os.hostname());
console.log("Arquitectura -> " + os.arch());
console.log("Plataforma -> " + os.platform());
console.log("Memoria total (Bytes) -> " + os.totalmem());

const options = {
  uploadDir: './public/file_upload',
  autoClean: false
};

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

var login = require('./src/sesion.js');
app.post('/session', login)

app.get("/logout", function(req,res){
		console.log("cerrando sesion");
		req.session.destroy();
				
		res.redirect('/');
	})

app.get('/help',function(req,res){
	res.send('Ayuda...')
})
app.get('/contact',function(req,res){
	res.send('Contactos...')
})
app.use("/admin", session_admin);
app.use("/admin",routes_admin);
app.use("/home",routes_home);
app.use("/doce",session_doce);
app.use("/doce",routes_doce);

app.listen(app.get('port'), ()=>{
	console.log(`El servidor esta corriendo en el puerto ${app.get('port')}`);
});
