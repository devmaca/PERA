var express = require('express');
var router = express.Router();
var con = require('./src/database.js');


router.get('/', function(req, res){
	con.query("SELECT * FROM curso",[],function(err,result){
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
			docenteId: 1}
		con.query("INSERT INTO curso set ?",[curso],function(err,result){
			if(err) throw err;
			console.log('Curso registrado...'+result.affectedRows);
			res.redirect('/doce')
		})
	})


router.route('/agregar')
	.get(function(req, res){
		res.render('agregar_contenido.pug');
	})

/* /home/contenido */
// router.route('/contenido')
// 	.get(function(req, res){
// 		res.render('contenido.pug');
// 	})


module.exports = router;