import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onLogin, onRegister, isSubmitting, error }) {
  const [isValid, setIsValid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting || !event.currentTarget.checkValidity()) return;
    const values = new FormData(event.currentTarget);
    onRegister({ name: values.get("name"), email: values.get("email"), password: values.get("password") });
  }

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onChange={(event) => setIsValid(event.currentTarget.checkValidity())}
    >
      <p className="modal__note">Demo registration. Use sample details; passwords are not stored.</p>
      <label className="register__label" htmlFor="register-email">Email</label>
      <input
        className="register__input"
        id="register-email"
        name="email"
        type="email"
        placeholder="Enter email"
        autoComplete="email"
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        required
      />

      <label className="register__label" htmlFor="register-password">Password</label>
      <input
        className="register__input"
        id="register-password"
        name="password"
        type="password"
        placeholder="Enter password"
        autoComplete="new-password"
        required
      />

      <label className="register__label" htmlFor="register-name">Name</label>
      <input
        className="register__input"
        id="register-name"
        name="name"
        type="text"
        placeholder="Enter your name"
        autoComplete="name"
        pattern=".*\S.*"
        required
      />

      {error && <p className="modal__error" role="alert">{error}</p>}
      <button className="register__submit" type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
      <p className="modal__switch">
        or{" "}
        <button className="modal__switch-button" type="button" onClick={onLogin} disabled={isSubmitting}>
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
