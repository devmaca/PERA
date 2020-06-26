var express = require('express');
var router = express.Router();
var con =require('./src/database.js');
router.get('/', function(req, res){
	res.render('index2');
})
var cursos = [{nom:"primero",nivel:"inicial"},
				{nom:"segundo",nivel:"inicial"},
				{nom:"tercero",nivel:"primario"},
				{nom:"cuarto",nivel:"primario"},
				{nom:"quinto",nivel:"primario"},
				{nom:"sexto",nivel:"primario"}
				];
// /home/materia
router.route('/curso/:id')
	.get(function(req, res){
		if(req.params.id <= 1){
			//inicial
			let n = 'inicial'
			res.render('cursos',{nivel:n,cursos:cursos});
		}else{
			//primario
			let n = 'primario';
			res.render('cursos',{nivel:n,cursos:cursos})
		}
	})
router.route('/:curso')
	.get(function(req, res){
		con.query('select * from admin',[],(err, result)=>{
			if(err) console.error(err);
			console.log(result)
			res.send(req.params.curso)
		})
	})

/* /home/contenido */
router.route('/contenido')
	.get(function(req, res){
		res.render('contenido.pug');
	})


module.exports = router;