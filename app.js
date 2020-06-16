'use strict'

var express = require('express');

var app = express();

var routes_home = require('./routes_home.js');
var routes_doce = require('./routes_doce.js');
var publicDir =  `${__dirname}/CARRUSEL`;



app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine
app.use("/public",express.static('public'));// Servir archivos estaticos para el sitio

app.get("/", function(req, res){
	let nombre = "MiguelCondori"
	let titulo = "PLATAFORMA EDUCATIVA REGIMIENTO AROMA"
	// res.end(`<h1>${titulo}</h1>
	// 			<h2>hola Mundo mi nombre es : ${nombre}</h2>`)
	res.render('index');
})

app.get("/otro", function(req, res){
	let autor = "MiguelCondori"
	let titulo = "PLATAFORMA EDUCATIVA REGIMIENTO AROMA"
	res.send("Modifique este texto 3 veces");
})
app.use("/home",routes_home);
app.use("/doce",routes_doce);

app.listen(3000,'localhost');
console.log("El servidor 'PERA' esta corriendo en el puerto 3000")