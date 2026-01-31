import { useRef } from "react";
import "./Modal.scss";

export default function Modal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null);

  function handleClickOutside(e) {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  function handleClickClose() {
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClickOutside} ref={overlayRef}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClickClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
