// User Routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Vulnerable SQL Injection endpoint
router.post('/login', userController.login);

// Vulnerable IDOR endpoint
router.get('/user/:id', userController.getUserById);

module.exports = router;
