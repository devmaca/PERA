module.exports = function(req,res,next){
	console.log(req.session)
	console.log(req.session.usuario)
	if(!req.session.usuario){ //si no existe valor no hay usuario
		console.log('Usuario no encontrado');

		res.redirect("/")// vuelve a ruta login

	}
	else{
		console.log("usuario "+req.session.usuario+" iniciando sesion...");
		res.locals = {	user:req.session.usuario,
						nom:'administrador'};		
				next();
	}

}