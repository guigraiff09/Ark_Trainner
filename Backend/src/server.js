const path = require('path');
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //  Importa o arquivo de rotas que criamos

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// 🚀 ESSA É A CHAVE: Diz ao Express para servir os arquivos da pasta Frontend
// O path.join garante que o caminho funcione em qualquer computador
app.use(express.static(path.join(__dirname, '../../Frontend')));

const frontendPath = path.resolve(__dirname, '..', '..', 'Frontend');

app.use(express.static(frontendPath));

// Opcional: Forçar o carregamento do index.html na rota raiz '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- USANDO AS ROTAS ---
app.use(routes); //  Diz para o Express usar as rotas do arquivo routes.js

// --- INICIALIZAÇÃO ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando perfeitamente em http://localhost:${PORT}`);
});