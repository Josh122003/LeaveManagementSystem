const express = require('express');
const db = require('../config/db'); // Ensure this points to your database connection
const router = express.Router();

router.post('/reset-password', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Query to check if the user exists
    const query = 'SELECT * FROM students WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Username not found' });
        }

        // Query to update the password
        const updateQuery = 'UPDATE students SET password = ? WHERE username = ?';
        db.query(updateQuery, [password, username], (err) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ message: 'Error updating password' });
            }
            res.status(200).json({ message: 'Password reset successfully' });
        });
    });
});

module.exports = router;
