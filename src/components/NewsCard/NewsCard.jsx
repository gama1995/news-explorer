import { useContext, useId } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./NewsCard.css";
import placeholderImage from "../../images/article-placeholder.svg";
import bookmarkIcon from "../../images/bookmark.svg";
import savedBookmarkIcon from "../../images/bookmark-filled.svg";
import trashIcon from "../../images/trash.svg";

function NewsCard({ article, onSignIn, onToggleSave, isSaved = false, isPending = false, isSavedPage = false }) {
  const currentUser = useContext(CurrentUserContext);
  const tooltipId = useId();
  const saveLabel = isSavedPage ? "Delete saved article" : currentUser
    ? (isSaved ? "Remove from saved articles" : "Save article")
    : "Sign in to save articles";
  const publishedDate = new Date(article.publishedAt);
  const hasValidDate = Boolean(article.publishedAt) && !Number.isNaN(publishedDate.getTime());

  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = placeholderImage;
  }

  return (
    <article className="news-card">
      {isSavedPage && article.keyword && <span className="news-card__keyword">{article.keyword}</span>}
      <div className="news-card__save-wrapper">
        <button
          className="news-card__save"
          type="button"
          onClick={currentUser ? () => onToggleSave(article) : onSignIn}
          disabled={isPending}
          aria-label={saveLabel}
          aria-pressed={!isSavedPage && currentUser ? isSaved : undefined}
          aria-busy={isPending}
          aria-describedby={tooltipId}
        >
          <img className="news-card__save-icon" src={isSavedPage ? trashIcon : isSaved ? savedBookmarkIcon : bookmarkIcon} alt="" />
        </button>
        <span className="news-card__tooltip" role="tooltip" id={tooltipId}>
          {saveLabel}
        </span>
      </div>
      <img
        className="news-card__image"
        src={article.urlToImage || placeholderImage}
        alt={article.title}
        loading="lazy"
        onError={handleImageError}
      />

      <div className="news-card__content">
        {hasValidDate && <time
          className="news-card__date"
          dateTime={article.publishedAt}
        >
          {publishedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>}

        <h2 className="news-card__title">
          <a
            className="news-card__link"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </h2>

        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source?.name || "News"}</p>
      </div>
    </article>
  );
}

export default NewsCard;
