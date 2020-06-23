var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	
	res.render('administracion');
})

// /admin/areas
router.route('/areas')
	.get(function(req, res){
		res.render('materia.pug');
	})

/* /admin/cursos */
router.route('/cursos')
	.get(function(req, res){
		res.render('contenido.pug');
	})

// /admin/agregar	
router.route('/agregar')
	.get(function(req, res){
		res.render('admin/agregar.pug');
	})


module.exports = router;