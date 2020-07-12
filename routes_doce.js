var express = require('express');
var router = express.Router();
var con = require('./src/database.js');

router.get('/', function(req, res){
	console.log("Usuario Id docente  : "+req.session.usuario)
	con.query("SELECT * FROM curso WHERE docenteId=?",[req.session.usuario],function(err,result){
			if(err) throw err;
			console.log(result);
			res.render('docente',{cursos:result})
		})
})

/* Agregar curso */
router.route('/add_curso')
	.get(function(req, res){
		res.render('cursos/agregarCurso.pug')
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
			cursoId : req.params.id
		}
		con.query("INSERT INTO contenido set ?",[contenido],function(err,result){
			if(err) throw err;
			console.log('recibido...')
			res.send('received...')
			
		})
		
	})


/* /home/contenido */
// router.route('/contenido')
// 	.get(function(req, res){
// 		res.render('contenido.pug');
// 	})


module.exports = router;