const express = require('express');
const router = express.Router();

const db = require('./database');


// =========================
// LOGIN
// =========================

router.post('/login', (req, res) => {

  const { email, senha } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE email = ? AND senha = ?
  `;

  db.query(sql, [email, senha], (err, result) => {

    if(err){
      return res.status(500).json({
        erro: 'Erro interno'
      });
    }

    if(result.length === 0){

      return res.status(401).json({
        sucesso: false
      });

    }

    const usuario = result[0];

    res.json({

      sucesso: true,

      nome: usuario.nome,

      tipo: usuario.tipo

    });

  });

});


// =========================
// ENVIAR CONTATO
// =========================

router.post('/contato', (req, res) => {

  const { nome, email, assunto, mensagem } = req.body;

  const sql = `
    INSERT INTO contato
    (nome, email, assunto, mensagem)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nome, email, assunto, mensagem], (err, result) => {

    if(err){
      return res.status(500).json({
        erro: 'Erro ao salvar'
      });
    }

    res.json({
      mensagem: 'Salvo com sucesso!'
    });

  });

});


// =========================
// LISTAR CONTATOS
// =========================

router.get('/contatos', (req, res) => {

  const sql = `
    SELECT * FROM contato
    ORDER BY data_envio DESC
  `;

  db.query(sql, (err, result) => {

    if(err){
      return res.status(500).json({
        erro: 'Erro ao buscar'
      });
    }

    res.json(result);

  });

});


// =========================
// DELETAR CONTATO
// =========================

router.delete('/contato/:id', (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM contato
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if(err){
      return res.status(500).json({
        erro: 'Erro ao deletar'
      });
    }

    res.json({
      mensagem: 'Mensagem apagada'
    });

  });

});


module.exports = router;