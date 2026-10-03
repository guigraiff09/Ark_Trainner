const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgre',
  database: 'ark_trainner_tcc'
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
    return;
  }

  console.log('✅ Conectado ao PostgreSQL com sucesso!');
  release();
});

module.exports = pool;