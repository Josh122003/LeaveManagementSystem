const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const app = express();
const authRoutes = require('./routes/auth'); // Adjust the path as necessary

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.use('/api/students', authRoutes);
app.use('/api/leaves', leaveRoutes);
//app.use('/api', leaveRoutes);
module.exports = app;
