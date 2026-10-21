import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onRegister, onLogin, isSubmitting, error }) {
  const [isValid, setIsValid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting || !event.currentTarget.checkValidity()) return;
    const values = new FormData(event.currentTarget);
    onLogin({ email: values.get("email"), password: values.get("password") });
  }

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onChange={(event) => setIsValid(event.currentTarget.checkValidity())}
    >
      <p className="modal__note">Demo sign-in: use a sample email and password. No real account is required.</p>
      <label className="login__label" htmlFor="login-email">
        Email
      </label>
      <input
        className="login__input"
        id="login-email"
        name="email"
        type="email"
        placeholder="Enter email"
        autoComplete="email"
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        required
      />

      <label className="login__label" htmlFor="login-password">
        Password
      </label>
      <input
        className="login__input"
        id="login-password"
        name="password"
        type="password"
        placeholder="Enter password"
        autoComplete="current-password"
        required
      />

      {error && <p className="modal__error" role="alert">{error}</p>}
      <button className="login__submit" type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
      <p className="modal__switch">
        or{" "}
        <button className="modal__switch-button" type="button" onClick={onRegister} disabled={isSubmitting}>
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
