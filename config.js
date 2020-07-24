require('dotenv').config();

const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

console.log('is this production? ', isProduction);

const connectionString = `postgresql://${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // for prod v
  //ssl: { rejectUnauthorized: false}
  // for local v
  //ssl: isProduction
  ssl: false
});

module.exports = { pool };
