var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	
	res.render('docente');
})

// /doce/agregar
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