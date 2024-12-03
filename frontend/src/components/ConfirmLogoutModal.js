import React from 'react';

const ConfirmLogoutModal = ({ onConfirm, onCancel }) => (
    <div className="modal-overlay">
        <div className="modal">
            <h3>Are you sure you want to log out?</h3>
            <button onClick={onConfirm} className="confirm-button">Yes</button>
            <button onClick={onCancel} className="cancel-button">No</button>
        </div>
    </div>
);

export default ConfirmLogoutModal;
