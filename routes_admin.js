var express = require('express');
var router = express.Router();
var con = require('./src/database.js');
router.get('/', function(req, res){
	con.query('SELECT * FROM docente',[],function(err,result){
		if(err) throw err;

		if(!result){
			console.log("essss undefined")
			res.render('administracion',{data:result})
		}else{
			console.log("essss",result)
			res.render('administracion',{data:result})
		}
	})
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

router.route('/add_docente')
	.get(function(req, res){
		res.render('docente/addDocente.pug')
	})
	.post(function(req,res){
		const datos = {
			nombres : req.body.nom,
			apellidos : req.body.ap,
			ci: req.body.ci,
			pass : req.body.pass
		}
		con.query('INSERT INTO docente SET ?',[datos],function(err, result){
			if(err) throw err;
			console.log('docente registrado...'+result.affectedRows);
			res.redirect('/admin')
		})
	})

module.exports = router;