import React from 'react';
import './Popup.css';


interface PopupProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return ;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Are you sure?</h2>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="popup-button">Yes</button>
          <button onClick={onClose} className="popup-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
