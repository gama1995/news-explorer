export const ARTICLES_PER_BATCH = 3;
export const NEWS_PAGE_SIZE = 100;
export const SEARCH_DAYS = 7;
export const REQUEST_TIMEOUT_MS = 20000;
export const SEARCH_ERROR_MESSAGE =
  "Sorry, something went wrong during the request. Please try again later.";
export const NEWS_API_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";
