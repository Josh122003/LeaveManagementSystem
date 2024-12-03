const db = require('../config/db');

class Admin {
    static async findByUsername(username) {
        const [rows] = await db.promise().query('SELECT * FROM admins WHERE username = ?', [username]);
        return rows[0];
    }
}

module.exports = Admin;
