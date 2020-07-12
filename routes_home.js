var express = require('express');
var router = express.Router();
var con =require('./src/database.js');
router.get('/', function(req, res){
	con.query('SELECT * FROM contenido',[],function(err,result){
		console.log(result)
		res.render('contenidos/show_all',{content:result});
	})
	
})

// /home/materia
router.route('/curso/:id')
	.get(function(req, res){
		con.query('SELECT * FROM curso WHERE nivel = ?',[req.params.id], function(err, result){
			if(err) throw err;
			console.log(result);
			res.render('cursos',{curso:result});
		})

	})
// router.route('/:id')
// 	.get(function(req, res){
// 		con.query('SELECT * FROM curso WHERE id=?',[req.params.id],(err, result)=>{
// 			if(err) throw err;
// 			console.log(result);
			
// 			res.send('En desarrollo...')
// 		})
// 	})

/* /home/contenido */
router.route('/contenido')
	.get(function(req, res){
		res.render('contenido.pug');
	})
router.route('/contenido/:idCurso')
	.get(function(req, res){
		con.query('SELECT * FROM area',[],(err,result)=>{
			if(err) throw err;
			res.render('cursos/areasCurso',{areas:result,idCurso:req.params.idCurso})
		})
		
	})

router.route('/contenido/:idCurso/:idArea')
	.get(function(req, res){
		con.query('SELECT * FROM contenido WHERE cursoId = ? and areaId=?',[req.params.idCurso,req.params.idArea],(err,result)=>{
			if(err) throw err;
			res.render('cursos/areasCurso',{areas:result,idCurso:req.params.idCurso})
		})
		
	})


module.exports = router;