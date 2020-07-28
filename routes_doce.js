var express = require('express');
var router = express.Router();
var con = require('./src/database.js');

/* ruta central docente*/
router.get('/', function(req, res){
	console.log("Usuario Id docente  : "+req.session.usuario)
	var docente;
	/*Consulta para extraer perfil de docente*/
	con.query("SELECT * FROM docente WHERE id=?",[req.session.usuario],function(err,result2){
		if(err) throw err;
		docente = result2;
	})
	/*Consulta para extraer cursos del docente*/
	con.query("SELECT * FROM curso WHERE docenteId=?",[req.session.usuario],function(err,result){
			if(err) throw err;
			console.log(result);
			res.render('docente',{cursos:result,doce:docente})
		})
	
})

/* Agregar curso */
router.route('/add_curso')
	.get(function(req, res){
		con.query('SELECT * FROM curso',[],(err,result)=>{
			if(err) throw err;
			res.render('cursos/agregarCurso.pug',{cursos:result})
		})

	})
	.post(function(req, res){
		const curso = {	
			nombre: req.body.grado,
			nivel: req.body.nivel,
			docenteId: req.session.usuario}
		con.query("INSERT INTO curso set ?",[curso],function(err,result){
			if(err) throw err;
			console.log('Curso registrado...'+result.affectedRows);
			res.redirect('/doce')
		})
	})
/* Agregar contenido*/
router.route('/add_content/:id')
	.get(function(req,res){
		con.query("SELECT * FROM area",[], function(err,result){
			if(err) throw err;
			res.render('contenidos/agregar_contenido.pug',{areas:result,cursoId:req.params.id})
		})
		
	})
	.post(function(req,res){
		console.log(req.files.archivo.path)
		let contenido = {
			titulo : req.body.titulo,
			seccion : req.body.seccion,
			descripcion : req.body.descripcion,
			contenido : req.files.archivo.path,
			areaId : req.body.area,
			cursoId : req.params.id,
			docenteId: req.session.usuario,
			tipo: "docu"
		}
		con.query("INSERT INTO contenido set ?",[contenido],function(err,result){
			if(err) throw err;
			console.log('recibido...')
			res.redirect('/doce')
			
		})
		
	})
/*agregar contenido video*/

router.route('/add_content_video/:id')
	.get(function(req,res){
		con.query("SELECT * FROM area",[], function(err,result){
			if(err) throw err;
			res.render('contenidos/add_content_video.pug',{areas:result,cursoId:req.params.id})
		})
		
	})
	.post(function(req,res){
		let url = req.body.uri;
		let videoId = url.split("/");
		let contenido = {
			titulo : req.body.titulo,
			seccion : req.body.seccion,
			descripcion : req.body.descripcion,
			contenido : videoId.pop(),
			areaId : req.body.area,
			cursoId : req.params.id,
			docenteId: req.session.usuario,
			tipo:"video"
		}
		//Output contenido.contenido = Id video
		con.query("INSERT INTO contenido set ?",[contenido],function(err,result){
			if(err) throw err;
			console.log('recibido...')
			res.redirect('/doce')
			
		})
		
	})

/* Ver todos contenido del curso*/
router.route('/showAll/:id')
	.get(function(req,res){
		con.query("SELECT * FROM contenido WHERE cursoId=?",[req.params.id], function(err,result){
			if(err) throw err;
			res.render('docente/showContent.pug',{content:result})
		})
		
	})


/* Ver contenido en especifico*/
router.route('/content/:id')
	.get(function(req,res){
		con.query("SELECT * FROM contenido WHERE id=?",[req.params.id], function(err,result){
			if(err) throw err;
			res.render('contenidos/show.pug',{content:result})
		})
		
	})

/* Ver contenido video*/
router.route('/video/:id')
	.get(function(req,res){
		con.query("SELECT * FROM contenido WHERE id=?",[req.params.id], function(err,result){
			if(err) throw err;
			res.render('contenidos/show_video.pug',{content:result})
		})
		
	})
	

/* /home/contenido */
// router.route('/contenido')
// 	.get(function(req, res){
// 		res.render('contenido.pug');
// 	})


module.exports = router;