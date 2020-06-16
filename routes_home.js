var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	let autor = "MiguelCondori"
	let titulo = "PLATAFORMA EDUCATIVA REGIMIENTO AROMA"
	res.render('index2',{title:titulo, message:autor});
})

// /home/materia
router.route('/materia')
	.get(function(req, res){
		res.render('materia.pug');
	})

/* /home/contenido */
router.route('/contenido')
	.get(function(req, res){
		res.render('contenido.pug');
	})


module.exports = router;