import React from "react";
import "./alert.css";

interface AlertProps {
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="alert">
      <span className="closebtn" onClick={handleClose}>&times;</span>
      <p className="alert-text">{message}</p>
    </div>
  );
};

export default Alert;
