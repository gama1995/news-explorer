import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader" role="status">
      <div className="preloader__spinner" aria-hidden="true" />
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
