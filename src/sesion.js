var pool =require('./database.js');
module.exports = function (req,res){
	pool.query('SELECT * FROM admin WHERE ci=? and password=?',[req.body.user,req.body.password],(err,result)=>{
		if(err) throw err;

		if(!result[0]){
			pool.query('SELECT * FROM docente WHERE ci=? and pass=?',[req.body.user,req.body.password],(err,result2)=>{
				if(err) throw err;
				if(!result2[0])
				{
					res.redirect('/')
					console.log('usuario no existe: ',result2)
				}
				else{ 
					console.log(result2)
					req.session.usuario = result2[0].id;
					res.redirect('/doce')
				}
			})
		}else{
		const mostrar = {
				id :result[0].id,
				nombre : result[0].nombres,
				apellido : result[0].apellidos,
				ci : result[0].ci
		}
		console.log('usuario: ',mostrar)
			req.session.usuario = result[0].id;
			res.redirect('/admin');
		}
	})
}