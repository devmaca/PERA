const mysql = require('mysql');
// const { promisify }= require('util');
const pool = mysql.createConnection({
	connectionLimit: 10,
	host: 'db4free.net',
	user: 'devmaca',
	password: 'meolvide',	
	database:'app123'
});

pool.connect(function(err){
	if (err) console.log(err) ;
	console.log('conectado a Mysql!');
	});


/* validar errores comunes con conexion a BD*/

// pool.getConnection(function(err,connection){
// 	if (err){
// 		if (err.code === 'PROTOCOL_CONNECTION_LOST'){
// 			console.error('DATABASE CONNECTION WAS CLOSED');
// 		}
// 		if (err.code === 'ER_CON_COUNT_ERROR'){
// 			console.error('DATABASE HAS TO MANY CONNECTIONS');
// 		}
// 		if (err.code === 'ECONNREFUSED'){
// 			console.error('DATABASE CONNECTION WAS REFUSED');
// 		}
// 	}

// 	if (connection) connection.release();
// 	console.log('DB is connected');
// 	return;
// })

/* Promisify Pool Querys */
//pool.query = promisify(pool.query);

module.exports = pool;