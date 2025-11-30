// Routes untuk endpoint IDOR user_secrets
const express = require('express');
const router = express.Router();
const secretController = require('../controllers/secretController');

// Vulnerable IDOR endpoint
router.get('/secret/:id', secretController.getSecretById);

module.exports = router;
