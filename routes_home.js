var express = require('express');
var router = express.Router();
var con =require('./src/database.js');
router.get('/', function(req, res){
	res.render('index2');
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
router.route('/:id')
	.get(function(req, res){
		con.query('SELECT * FROM curso WHERE id=?',[req.params.id],(err, result)=>{
			if(err) throw err;
			console.log(result);
			
			res.send('En desarrollo...')
		})
	})

/* /home/contenido */
router.route('/contenido')
	.get(function(req, res){
		res.render('contenido.pug');
	})


module.exports = router;