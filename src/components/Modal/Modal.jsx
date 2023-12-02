import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, onClose }) => {
  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="Large" />
      </div>
    </div>
  );
};
