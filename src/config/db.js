const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'educourse_db',
  port: Number(process.env.DB_PORT) || 3308,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then((connection) => {
    console.log('Database MySQL berhasil terhubung!');
    connection.release();
  })
  .catch((err) => {
    console.error('Gagal terhubung ke MySQL:', err.message);
  });

module.exports = db;