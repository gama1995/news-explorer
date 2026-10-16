import { NEWS_API_URL, NEWS_PAGE_SIZE, SEARCH_DAYS } from "./constants.js";

export async function searchNews(keyword, signal) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "Add VITE_NEWS_API_KEY to .env.local, then restart the development server.",
    );
  }

  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - SEARCH_DAYS);

  const parameters = new URLSearchParams({
    q: keyword,
    apiKey,
    from: from.toISOString(),
    to: to.toISOString(),
    pageSize: String(NEWS_PAGE_SIZE),
  });

  const response = await fetch(`${NEWS_API_URL}?${parameters}`, { signal });
  const data = await response.json();

  if (!response.ok || data.status !== "ok" || !Array.isArray(data.articles)) {
    throw new Error("The news service could not complete the search.");
  }

  const articleUrls = new Set();

  return data.articles.filter((article) => {
    if (!article?.title || article.title === "[Removed]" || !article.url) {
      return false;
    }

    try {
      const url = new URL(article.url);
      if (!["https:", "http:"].includes(url.protocol)) return false;
    } catch {
      return false;
    }

    if (articleUrls.has(article.url)) return false;
    articleUrls.add(article.url);
    return true;
  });
}
