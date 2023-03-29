const mysql      = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'user1',
    password : '123456',
    database : 'atv1403'
});



connection.connect((err) => {
  if(err) return console.log('Erro ao tentar se conectar com o banco de dados :(');
  console.log('conectado ao banco de dados!');
});


module.exports = connection;