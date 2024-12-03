const db = require('../config/db');

class Student {
    static async findByUsername(username) {
        const [rows] = await db.promise().query('SELECT * FROM students WHERE username = ?', [username]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.promise().query('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Student;
