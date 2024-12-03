const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

exports.studentLogin = async (req, res) => {
    const { username, password } = req.body;

    const student = await Student.findByUsername(username);
    if (student && student.password === password) {
        const token = jwt.sign({ id: student.id, role: 'student' }, process.env.JWT_SECRET);
        return res.json({ success: true, token, id: student.id });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
};

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findByUsername(username);
    if (admin && admin.password === password) {
        const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET);
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
};
