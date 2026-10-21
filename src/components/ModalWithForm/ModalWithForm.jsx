import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  onChange,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <h2 className="modal__title" id="modal-title">
          {title}
        </h2>

        <form className="modal__form" onSubmit={onSubmit} onChange={onChange}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
