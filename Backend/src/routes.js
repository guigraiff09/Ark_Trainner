const express = require('express');
const router = express.Router();
const db = require('./database'); // Importa a conexão com o banco

// Rota de Teste
router.get('/', (req, res) => {
  res.send('API do TCC rodando! ');
});

// ROTA: Receber contato
router.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  const sql = 'INSERT INTO contato (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [nome, email, assunto, mensagem], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro interno ao salvar' });
    res.json({ mensagem: 'Salvo no banco com sucesso!' });
  });
});

// ROTA: Login
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'admin' && senha === '123') return res.json({ sucesso: true });
  res.status(401).json({ sucesso: false });
});

// ROTA: Listar contatos
router.get('/contatos', (req, res) => {
  const sql = 'SELECT * FROM contato ORDER BY data_envio DESC';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar' });
    res.json(result);
  });
});

// ROTA: Deletar contato
router.delete('/contato/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM contato WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar' });
    res.json({ mensagem: 'Apagado com sucesso!' });
  });
});

module.exports = router; // Exporta todas as rotas