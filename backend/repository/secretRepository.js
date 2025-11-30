// Repository untuk data rahasia user (IDOR)
const pool = require('../config/db');

exports.getSecretById = async (id) => {
  // Vulnerable query: tidak ada otorisasi
  const query = `SELECT * FROM user_secrets WHERE id = '${id}'`;
  const result = await pool.query(query);
  return result.rows[0];
};
