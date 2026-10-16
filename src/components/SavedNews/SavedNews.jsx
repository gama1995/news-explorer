import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { getKeywordSummary } from "../../utils/savedArticles.js";
import NewsCard from "../NewsCard/NewsCard.jsx";
import "./SavedNews.css";

function SavedNews({ articles, onDelete, pendingArticleUrls }) {
  const currentUser = useContext(CurrentUserContext);
  const keywordSummary = getKeywordSummary(articles);

  return (
    <>
      <section className="saved-news" aria-labelledby="saved-news-title">
        <p className="saved-news__label">Saved articles</p>
        <h1 className="saved-news__title" id="saved-news-title">
          {currentUser.name}, you have {articles.length} saved article{articles.length === 1 ? "" : "s"}
        </h1>
        {keywordSummary && (
          <p className="saved-news__keywords">By keywords: <strong>{keywordSummary}</strong></p>
        )}
      </section>

      <section className="saved-news__results" aria-label="Your saved articles">
        {articles.length > 0 ? (
          <div className="saved-news__cards">
            {articles.map((article) => (
              <NewsCard
                key={article.url}
                article={article}
                isSaved
                isSavedPage
                onToggleSave={onDelete}
                isPending={pendingArticleUrls.includes(article.url)}
              />
            ))}
          </div>
        ) : (
          <div className="saved-news__empty">
            <h2 className="saved-news__empty-title">No saved articles yet</h2>
            <p>Search for a topic and bookmark articles you want to keep.</p>
            <Link className="saved-news__home" to="/">Find articles</Link>
          </div>
        )}
      </section>
    </>
  );
}

export default SavedNews;
