const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
    const { type, fromDate, toDate, reason } = req.body;
    const studentId = req.user.id;

    const leaveId = await Leave.create({ studentId, type, fromDate, toDate, reason });
    return res.json({ success: true, leaveId });
};

exports.getStudentLeaves = async (req, res) => {
    const studentId = req.user.id;
    const leaves = await Leave.findByStudentId(studentId);
    return res.json(leaves);
};

exports.getAllLeaves = async (req, res) => {
    const leaves = await Leave.findAll();
    return res.json(leaves);
};

exports.updateLeaveStatus = async (req, res) => {
    const { id, status } = req.body;
    await Leave.updateStatus(id, status);
    return res.json({ success: true });
};

// New method to cancel leave
exports.cancelLeave = async (req, res) => {
    const leaveId = req.params.id; // Get the leave ID from the request parameters

    try {
        // Check if the leave exists
        const leave = await Leave.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        // Delete the leave from the database
        await Leave.deleteOne({ _id: leaveId });
        return res.json({ success: true, message: 'Leave canceled successfully' });
    } catch (error) {
        console.error('Error canceling leave:', error);
        return res.status(500).json({ message: 'Failed to cancel leave. Please try again.' });
    }
};
