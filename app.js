'use strict'

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

var session_admin = require('./sesiones/sesionadmin.js');

var routes_home = require('./routes_home.js');
var routes_doce = require('./routes_doce.js');
var routes_admin = require('./routes_admin.js')

var pool =require('./src/database.js');
pool.query("select * from admin",[],function(err,result){
	console.log('el resultado es : ',result)
})

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
var datos = [{user:"12345678",pass:"admin123"},{user:"111",pass:"3333"},{user:"121",pass:"3333"}];
var cursos = [{nom:"primero",nivel:"inicial"},
				{nom:"segundo",nivel:"inicial"},
				{nom:"tercero",nivel:"primario"},
				{nom:"cuarto",nivel:"primario"},
				{nom:"quinto",nivel:"primario"},
				{nom:"sexto",nivel:"primario"}
				];
var area = [
			{nom:"Matematica"},
			{nom:"lenguaje"},
			{nom:"Sociales"},
			{nom:"Naturales"},
			]

var sesion = function (req,res){
	pool.query('SELECT * FROM admin WHERE ci=? and password=?',[req.body.user,req.body.password],(err,result)=>{
		if(err) throw err;

		if(!result[0]){
			pool.query('SELECT * FROM docente WHERE ci=? and pass=?',[req.body.user,req.body.password],(err,result2)=>{
				if(err) throw err;
				if(!result2[0])
				{
					res.redirect('/')
					console.log('usuario no existe: ',result2)
				}
				else{ 
					console.log(result2)
					req.session.usuario = result2[0].id;
					res.redirect('/doce')
				}
			})
		}else{
		const mostrar = {
				id :result[0].id,
				nombre : result[0].nombres,
				apellido : result[0].apellidos,
				ci : result[0].ci
		}
		console.log('usuario: ',mostrar)
			req.session.usuario = result[0].id;
			res.redirect('/admin');
		}
	})
}
app.post('/session', sesion)

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
