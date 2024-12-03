const db = require('../config/db');

class Leave {
    static async create(leave) {
        const { studentId, type, fromDate, toDate, reason } = leave;
        const [result] = await db.promise().query('INSERT INTO leaves (studentId, type, fromDate, toDate, reason) VALUES (?, ?, ?, ?, ?)', [studentId, type, fromDate, toDate, reason]);
        return result.insertId;
    }

    static async findByStudentId(studentId) {
        const [rows] = await db.promise().query('SELECT * FROM leaves WHERE studentId = ?', [studentId]);
        return rows;
    }

    static async findAll() {
        const [rows] = await db.promise().query('SELECT * FROM leaves');
        return rows;
    }

    static async updateStatus(id, status) {
        await db.promise().query('UPDATE leaves SET status = ? WHERE id = ?', [status, id]);
    }
    // New method to find a leave by ID
    static async findById(id) {
        const leave = await db.query('SELECT * FROM leaves WHERE id = ?', [id]);
        return leave[0]; // Return the leave object or undefined
    }

    // New method to delete a leave
    static async delete(id) {
        await db.query('DELETE FROM leaves WHERE id = ?', [id]);
    }
}

module.exports = Leave;
