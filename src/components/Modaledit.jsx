// Modal.js
import React from 'react';
import '../Styles/Modal.css'; 
import { IoMdCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";

const Modal = ({ show, onClose, children, onSubmit }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={e => e.stopPropagation()}>
        <div className="modal-body">
          <h2 className="modal-title">Edit Component</h2>
          {children}
          <div className="modal-footer">
            <div className="submit-button" onClick={onSubmit}><IoMdCheckmark /></div>
            <div className="close-button" onClick={onClose}><HiMiniXMark /></div>
          </div>
        </div>
    </div>
  );
};

export default Modal;
