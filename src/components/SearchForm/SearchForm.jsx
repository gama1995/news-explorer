import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (isLoading) return;
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(trimmedKeyword);
  }

  return (
    <section className="search">
      <h1 className="search__title">What's going on in the world?</h1>
      <p className="search__description">
        Find the latest news on any topic and save them in your personal account.
      </p>

      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__input"
          type="search"
          name="keyword"
          placeholder="Enter topic"
          aria-label="News keyword"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "search-error" : undefined}
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            setError("");
          }}
          disabled={isLoading}
          maxLength={500}
          required
        />
        <button className="search__button" type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="search__error" id="search-error" role="alert">{error}</p>}
    </section>
  );
}

export default SearchForm;
