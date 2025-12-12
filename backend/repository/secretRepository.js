// User Repository for vulnerable queries
const pool = require('../config/db');

exports.getSecretById = async (id, userId) => {
  // SECURE: Parameterized Query & Authorization (IDOR remediation)
  const query = 'SELECT * FROM user_secrets WHERE id = $1 AND user_id = $2';
  const result = await pool.query(query, [id, userId]);
  return result.rows[0];
};
