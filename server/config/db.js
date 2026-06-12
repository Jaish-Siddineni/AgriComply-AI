const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Required for Railway/production SSL connections
  ssl: {
    rejectUnauthorized: false 
  }
});

// We export the pool directly. 
// With 'pg', the pool itself has a .query() method, 
// so no need for .promise() anymore!
module.exports = pool;