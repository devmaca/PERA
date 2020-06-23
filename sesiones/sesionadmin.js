module.exports = function(req,res,next){
	console.log(req.session)
	console.log(req.session.usuario)
	if(!req.session.usuario){ //si no existe valor no hay usuario
		console.log('USuario no encontrado');

		res.redirect("/")// vuelve a ruta login

	}
	else if(req.session.usuario == 1){
		console.log("usuario "+req.session.usuario+" iniciando sesion...");
		res.locals = {	user:req.session.usuario,
						nom:'administrador'};		
				next();
	}

}