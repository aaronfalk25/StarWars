import React, { useState } from "react";
import "./modal.css";

interface ModalProps {
    openText?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ openText, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <button onClick={() => setOpen(true)}> {openText ?? "Open"} </button>
    
    {open && (
        <div className="obfuscator" onClick={handleClose}>
            <div className="modal">
                <span className="closebtn" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    )}
    </>
  );
};

export default Modal;
