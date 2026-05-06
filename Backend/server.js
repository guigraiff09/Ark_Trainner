const express = require('express');
const cors = require('cors');

const app = express();

// 🔥 CORS (libera acesso do frontend)
app.use(cors({
  origin: '*' // para TCC/teste (libera qualquer origem)
}));

// 🔥 permite receber JSON
app.use(express.json());

// 🔎 rota teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// 📩 rota contato (POST)
app.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;

  console.log('Dados recebidos:');
  console.log('Nome:', nome);
  console.log('Email:', email);
  console.log('Mensagem:', mensagem);

  res.json({
    mensagem: 'Recebido com sucesso!'
  });
});

// 🚀 servidor rodando na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});