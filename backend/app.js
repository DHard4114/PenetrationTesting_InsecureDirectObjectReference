// Vulnerable Backend for Pentest Final Project
// Topik: SQL Injection & IDOR

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(logger);

// Import user routes

const userRoutes = require('./routes/userRoutes');
const secretRoutes = require('./routes/secretRoutes');
app.use('/', userRoutes);
app.use('/', secretRoutes);

app.listen(port, () => {
  console.log(`Vulnerable backend listening on port ${port}`);
});
