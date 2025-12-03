// User Repository for vulnerable queries
const pool = require('../config/db');

// exports.login = async (username, password) => {
//   // Vulnerable query (no sanitization)
//   const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
//   const result = await pool.query(query);
//   return result.rows[0];
// };

exports.login = async (username, password) => {
  // SECURE: Using Parameterized Query ($1, $2)
  const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
  const result = await pool.query(query, [username, password]);
  return result.rows[0];
};

exports.getUserById = async (id) => {
  // Vulnerable query (no auth)
  const query = `SELECT * FROM users WHERE id = ${id}`;
  const result = await pool.query(query);
  return result.rows[0];
};
