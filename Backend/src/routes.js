const express = require('express');
const router = express.Router();

const db = require('./database');


// =========================
// LOGIN
// =========================

router.post('/login', async (req, res) => {

  const { email, senha } = req.body;

  const sql = `
    SELECT * FROM usuarios
    WHERE email = $1 AND senha = $2
  `;

  try {

    const result = await db.query(sql, [email, senha]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        sucesso: false
      });
    }

    const usuario = result.rows[0];

    res.json({
      sucesso: true,
      nome: usuario.nome,
      tipo: usuario.tipo
    });

  } catch (err) {

    console.error('Erro no login:', err);

    res.status(500).json({
      erro: 'Erro interno'
    });

  }

});


// =========================
// ENVIAR CONTATO
// =========================

router.post('/contato', async (req, res) => {

  const { nome, email, assunto, mensagem } = req.body;

  const sql = `
    INSERT INTO contato
    (nome, email, assunto, mensagem)
    VALUES ($1, $2, $3, $4)
  `;

  try {

    await db.query(sql, [
      nome,
      email,
      assunto,
      mensagem
    ]);

    res.json({
      mensagem: 'Salvo com sucesso!'
    });

  } catch (err) {

    console.error('Erro ao salvar contato:', err);

    res.status(500).json({
      erro: 'Erro ao salvar'
    });

  }

});


// =========================
// LISTAR CONTATOS
// =========================

router.get('/contatos', async (req, res) => {

  const sql = `
    SELECT * FROM contato
    ORDER BY data_envio DESC
  `;

  try {

    const result = await db.query(sql);

    res.json(result.rows);

  } catch (err) {

    console.error('Erro ao buscar contatos:', err);

    res.status(500).json({
      erro: 'Erro ao buscar'
    });

  }

});


// =========================
// DELETAR CONTATO
// =========================

router.delete('/contato/:id', async (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM contato
    WHERE id = $1
  `;

  try {

    await db.query(sql, [id]);

    res.json({
      mensagem: 'Mensagem apagada'
    });

  } catch (err) {

    console.error('Erro ao deletar contato:', err);

    res.status(500).json({
      erro: 'Erro ao deletar'
    });

  }

});


// =========================
// MENSAGENS DO DASHBOARD
// =========================

router.get('/dashboard/mensagens', async (req, res) => {

  const sql = `
    SELECT COUNT(*) AS total
    FROM contato
  `;

  try {

    const result = await db.query(sql);

    res.json(result.rows[0]);

  } catch (err) {

    console.error('Erro ao buscar mensagens:', err);

    res.status(500).json({
      erro: 'Erro ao buscar mensagens'
    });

  }

});


module.exports = router;