require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : false
});

pool.connect((err, client, release) => {
  if (err) {
    console.error(' Erro ao conectar ao PostgreSQL:', err.message);
    return;
  }

  console.log('✅ Conectado ao PostgreSQL com sucesso!');

  release();
});

module.exports = pool;