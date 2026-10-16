export function getKeywordSummary(articles) {
  const keywords = new Map();
  articles.forEach((article) => {
    const keyword = article.keyword?.trim();
    if (!keyword) return;
    const key = keyword.toLowerCase();
    const entry = keywords.get(key);
    keywords.set(key, { label: entry?.label || keyword, count: (entry?.count || 0) + 1 });
  });

  const sortedKeywords = [...keywords.values()]
    .sort((first, second) => second.count - first.count || first.label.localeCompare(second.label))
    .map((entry) => entry.label);

  if (sortedKeywords.length <= 2) return sortedKeywords.join(", ");
  return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${sortedKeywords.length - 2} other${sortedKeywords.length === 3 ? "" : "s"}`;
}
