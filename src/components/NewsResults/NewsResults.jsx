import NewsCard from "../NewsCard/NewsCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import "./NewsResults.css";

function NewsResults({ status, articles, visibleCount, error, onShowMore, onSignIn, onToggleSave, savedArticles = [], pendingArticleUrls = [] }) {
  if (status === "idle") return null;

  return (
    <section className="results" aria-label="News search results" aria-busy={status === "loading"}>
      <div className="results__content">
        {status === "loading" && <Preloader />}
        {status === "error" && <p className="results__message" role="alert">{error}</p>}
        {status === "success" && articles.length === 0 && (
          <div className="results__empty" role="status">
            <h2 className="results__title">Nothing Found</h2>
            <p className="results__message">Sorry, but nothing matched your search terms.</p>
          </div>
        )}
        {status === "success" && articles.length > 0 && (
          <>
            <h2 className="results__title">Search results</h2>
            <div className="results__cards">
              {articles.slice(0, visibleCount).map((article) => (
                <NewsCard
                  key={article.url}
                  article={article}
                  onSignIn={onSignIn}
                  onToggleSave={onToggleSave}
                  isSaved={savedArticles.some((savedArticle) => savedArticle.url === article.url)}
                  isPending={pendingArticleUrls.includes(article.url)}
                />
              ))}
            </div>
            {visibleCount < articles.length && (
              <button className="results__more" type="button" onClick={onShowMore}>
                Show more
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default NewsResults;
