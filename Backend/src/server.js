const path = require('path');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// =========================
// MIDDLEWARES
// =========================

app.use(cors());
app.use(express.json());


// =========================
// FRONTEND
// =========================

const frontendPath = path.resolve(__dirname, '..', '..');

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


// =========================
// ROTAS
// =========================

app.use(routes);git


// =========================
// SERVIDOR
// =========================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente em http://localhost:${PORT}`);
});