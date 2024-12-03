const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth'); // Adjust the path to where your auth routes are defined

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // Register auth routes

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '1234', 
    database: 'leavemanagement' 
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login for students
app.post('/api/students/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM students WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: results[0].id }, 'your_jwt_secret');
        res.json({ token });
    });
});

// Login for admins
app.post('/api/admins/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: results[0].id }, 'your_jwt_secret');
        res.json({ token });
    });
});

// Get leaves for a student
app.get('/api/leaves/student', authenticateToken, (req, res) => {
    db.query('SELECT * FROM leaves WHERE studentId = ?', [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        res.json(results);
    });
});

// Get all leaves for admin
//app.get('/api/leaves/admin', authenticateToken, (req, res) => {
//    db.query('SELECT * FROM leaves', (err, results) => {
//        if (err) return res.status(500).json({ message: 'Internal server error' });
//        res.json(results);
//    });
//});
// Get all leaves for admin
app.get('/api/leaves/admin', authenticateToken, (req, res) => {
    db.query(`
        SELECT l.*, s.username 
        FROM leaves l 
        JOIN students s ON l.studentId = s.id`, 
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });
            res.json(results);
    });
});

// Apply for leave
app.post('/api/leaves', authenticateToken, (req, res) => {
    const { type, fromDate, toDate, reason } = req.body;
    const leaveData = { studentId: req.user.id, type, fromDate, toDate, reason };
    db.query('INSERT INTO leaves SET ?', leaveData, (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        res.status(201).json({ id: results.insertId, ...leaveData });
    });
});

// Update leave status
app.post('/api/leaves/status', authenticateToken, (req, res) => {
    const { id, status } = req.body;
    db.query('UPDATE leaves SET status = ? WHERE id = ?', [status, id], (err) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        res.sendStatus(204);
    });
});
// Get current student details (example endpoint)
app.get('/api/students/me', authenticateToken, (req, res) => {
    db.query('SELECT id, username FROM students WHERE id = ?', [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        if (results.length === 0) return res.status(404).json({ message: 'Student not found' });
        res.json(results[0]); // Send the student's details
    });
});
// Delete leave by ID
app.delete('/api/leaves/:id', authenticateToken, (req, res) => {
    const leaveId = req.params.id; // Get the leave ID from the request parameters
    db.query('DELETE FROM leaves WHERE id = ? AND studentId = ?', [leaveId, req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal server error' });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Leave not found' });
        res.sendStatus(204); // Successfully deleted
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
