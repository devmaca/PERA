'use strict'

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

var session_admin = require('./sesiones/sesionadmin.js');

var routes_home = require('./routes_home.js');
var routes_doce = require('./routes_doce.js');
var routes_admin = require('./routes_admin.js')


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
	let nombre = "MiguelCondori"
	let titulo = "PLATAFORMA EDUCATIVA REGIMIENTO AROMA"
	// res.end(`<h1>${titulo}</h1>
	// 			<h2>hola Mundo mi nombre es : ${nombre}</h2>`)
	res.render('index');
	
})
var datos = [{user:"ifkjlf",pass:"lklj"},{user:"111",pass:"3333"},{user:"121",pass:"3333"}];

function buscarUser(user,pass){
	var u = false;
	for(var i=0; i <= datos.length - 1; i++){
		if(datos[i].user == user && datos[i].pass == pass){
			console.log('usuario encontrado');
			u = true;
		}
	}
	return u;
}
app.post('/session', (req,res)=>{
	var adm={
		user:"12345678",
		pass:"admin123"
	}


	var doc={
		user:"87654321",	
		pass:"prof123"
	}

	if(buscarUser(req.body.user,req.body.password)){

		req.session.usuario = 1;

		res.redirect("/admin")
	}else{
		res.redirect('/')
	}

})

app.get("/logout", function(req,res){
		console.log("cerrando sesion");
		req.session.destroy();
				
		res.redirect('/');
	})

app.use("/admin", session_admin);
app.use("/admin",routes_admin);
app.use("/home",routes_home);
app.use("/doce",routes_doce);


app.listen(app.get('port'), ()=>{
	console.log(`El servidor esta corriendo en el puerto ${app.get('port')}`);
});
