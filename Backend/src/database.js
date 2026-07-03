const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'ark_trainner_tcc'
});

connection.connect((err) => {
  if (err) {
    console.error(' Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log(' Conectado ao MySQL com sucesso!');
});

module.exports = connection;