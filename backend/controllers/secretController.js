// Controller untuk endpoint IDOR user_secrets
const secretRepository = require('../repository/secretRepository');

// exports.getSecretById = async (req, res) => {
//   const secretId = req.params.id;
//   try {
//     const secret = await secretRepository.getSecretById(secretId);
//     if (secret) {
//       res.json(secret);
//     } else {
//       res.status(404).json({ message: 'Secret not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getSecretById = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        const secret = await secretRepository.getSecretById(req.params.id);
        const requesterId = req.user.id; // Dari Middleware Auth

        // SECURE: Cek Kepemilikan Data
        if (secret && secret.user_id !== requesterId) {
            return res.status(403).json({ message: 'Forbidden: Access Denied' });
        }
        
        if (secret) {
            res.json(secret);
        } else {
            res.status(404).json({ message: 'Secret not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};