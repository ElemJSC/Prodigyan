const connection = require('./db');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const multer  = require('multer')
const upload = multer();


const port = 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));


app.get('/cliente/buscar/email/:email', function (req, res) {

    let email = req.params.email
   
    execSQLQuery('select nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipo  from cliente join tipocliente on cliente.idtipocliente = tipocliente.idtipocliente where cliente.email = ' + '"' + email + '"' , res )

  });
  
  
  
  
  app.get('/tipocliente', (req, res) => {
    execSQLQuery('SELECT * FROM tipocliente', res);
    
  })
  
  
   
  app.get('/cliente/buscar/id/:id', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE idcliente=' + parseInt(req.params.id);
    execSQLQuery('select nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipo  from cliente join tipocliente on cliente.idtipocliente = tipocliente.idtipocliente' + filter, res);
   
  })
  
  
  app.post('/cliente/gravar', upload.any(), (req, res) => {
    const {nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipocliente } = req.body;
   
    const sql = 'INSERT INTO cliente (nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipocliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [ nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipocliente], (err, result) => {
      if (err) {
        console.log(`Erro ao inserir dados no banco de dados: ${err.message}`);
        res.status(500).send('Erro interno do servidor');
      } else {
        console.log(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
        res.status(200).send(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
      }
    });
  });
  
  
  


app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'user1',
      password : '123456',
      database : 'atv1403'
    });
   
    connection.query(sqlQry, (error, results, fields) => {
        if(error)
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }