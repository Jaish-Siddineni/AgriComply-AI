const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'agricomply_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// CRITICAL: Export pool.promise()
module.exports = pool.promise();