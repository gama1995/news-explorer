import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../images/github.svg";
import linkedinIcon from "../../images/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} NewsExplorer
      </p>

      <nav className="footer__navigation" aria-label="Footer navigation">
        <Link className="footer__link" to="/">
          Home
        </Link>
        <a
          className="footer__link"
          href="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TripleTen
        </a>
      </nav>

      <ul className="footer__social" aria-label="Social profiles">
        <li>
          <a
            className="footer__social-link"
            href="https://github.com/gama1995"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Daisy's GitHub profile"
          >
            <img className="footer__icon" src={githubIcon} alt="" width="24" height="24" />
          </a>
        </li>
        <li>
          <a
            className="footer__social-link"
            href="https://www.linkedin.com/in/daisy-gama-granados1995/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Daisy's LinkedIn profile"
          >
            <img className="footer__icon" src={linkedinIcon} alt="" width="24" height="24" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
