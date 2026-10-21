import { useContext, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import logoutIcon from "../../images/logout.svg";
import menuIcon from "../../images/menu.svg";
import closeIcon from "../../images/close.svg";
import "./Header.css";

function Header({ onSignIn, onSignOut, isLight = false }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handleOutsideClick(event) {
      if (!headerRef.current?.contains(event.target)) setIsMenuOpen(false);
    }

    const mobileQuery = window.matchMedia("(max-width: 600px)");
    function handleResize(event) {
      if (!event.matches) setIsMenuOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsideClick);
    mobileQuery.addEventListener("change", handleResize);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsideClick);
      mobileQuery.removeEventListener("change", handleResize);
    };
  }, [isMenuOpen]);

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleSignIn() {
    handleCloseMenu();
    onSignIn();
  }

  function handleSignOut() {
    handleCloseMenu();
    onSignOut();
  }

  return (
    <header ref={headerRef} className={`header${isLight ? " header--light" : ""}${isMenuOpen ? " header--menu-open" : ""}`}>
      <Link className="header__logo" to="/" onClick={handleCloseMenu}>
        NewsExplorer
      </Link>

      <button
        className="header__menu-toggle"
        type="button"
        ref={menuButtonRef}
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <img className="header__menu-icon" src={isMenuOpen ? closeIcon : menuIcon} alt="" />
      </button>

      <nav id={menuId} className={`header__navigation${isMenuOpen ? " header__navigation--open" : ""}`} aria-label="Main navigation">
        <NavLink className={({ isActive }) => `header__link${isActive ? " header__link--active" : ""}`} to="/" end onClick={handleCloseMenu}>
          Home
        </NavLink>

        {currentUser && (
          <NavLink className={({ isActive }) => `header__link${isActive ? " header__link--active" : ""}`} to="/saved-news" onClick={handleCloseMenu}>
            Saved articles
          </NavLink>
        )}

        {currentUser ? (
          <button className="header__button" type="button" onClick={handleSignOut} aria-label={`Log out ${currentUser.name}`} title="Log out">
            <span className="header__name">{currentUser.name}</span>
            <img className="header__logout-icon" src={logoutIcon} alt="" />
          </button>
        ) : (
          <button className="header__button" type="button" onClick={handleSignIn}>Sign in</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
