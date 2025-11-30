// Controller untuk endpoint IDOR user_secrets
const secretRepository = require('../repository/secretRepository');

exports.getSecretById = async (req, res) => {
  const secretId = req.params.id;
  try {
    const secret = await secretRepository.getSecretById(secretId);
    if (secret) {
      res.json(secret);
    } else {
      res.status(404).json({ message: 'Secret not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
