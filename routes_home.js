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
router.route('/nivel/:id')
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
router.route('/contenido/:id')
	.get(function(req, res){
		con.query('SELECT * FROM contenido WHERE id=?',[req.params.id],(err,result)=>{
			if(err) throw err;
			res.render('contenidos/show',{content:result})
		})
	})
router.route('/curso/:idCurso')
	.get(function(req, res){
		con.query('SELECT * FROM area',[],(err,result)=>{
			if(err) throw err;
			res.render('cursos/areasCurso',{areas:result,idCurso:req.params.idCurso})
		})
		
	})

router.route('/curso/:idCurso/:idArea')
	.get(function(req, res){
		con.query('SELECT * FROM contenido WHERE cursoId = ? and areaId=?',[req.params.idCurso,req.params.idArea],(err,result)=>{
			if(err) throw err;
			res.render('cursos/content',{content:result})
		})
		
	})


module.exports = router;