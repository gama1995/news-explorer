// Stage 1 frontend stubs. These do not authenticate against a real server.
// Passwords are accepted for the demo but are never stored.
const SESSION_KEY = "news-explorer-demo-session";
const PROFILE_PREFIX = "news-explorer-demo-profile:";
const ARTICLES_PREFIX = "news-explorer-demo-articles:";
const DEMO_TOKEN = "news-explorer-demo-token";

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error("Your browser could not save this change. Check that site storage is available.");
  }
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validateCredentials(email, password) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password?.trim()) {
    throw new Error("Enter a valid email and a password for this demo.");
  }
}

export function getDemoSession() {
  const session = readJson(SESSION_KEY, null);
  if (
    session?.token !== DEMO_TOKEN ||
    typeof session.user?.email !== "string" ||
    typeof session.user?.name !== "string"
  ) return null;
  return session.user;
}

export async function register({ email, password, name }) {
  const normalizedEmail = normalizeEmail(email);
  validateCredentials(normalizedEmail, password);
  const trimmedName = name?.trim();
  if (!trimmedName) throw new Error("Please enter your name.");
  const key = `${PROFILE_PREFIX}${normalizedEmail}`;
  if (readJson(key, null)) throw new Error("This demo email is already registered. Please sign in.");
  const user = { email: normalizedEmail, name: trimmedName };
  writeJson(key, user);
  return user;
}

export async function signIn({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  validateCredentials(normalizedEmail, password);
  const profile = readJson(`${PROFILE_PREFIX}${normalizedEmail}`, null);
  const user = {
    email: normalizedEmail,
    name: typeof profile?.name === "string" ? profile.name : normalizedEmail.split("@")[0],
  };
  writeJson(SESSION_KEY, { token: DEMO_TOKEN, user });
  return user;
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    throw new Error("Your browser could not end the demo session. Please try again.");
  }
}

export function getSavedArticles(user) {
  if (!user) return [];
  const articles = readJson(`${ARTICLES_PREFIX}${user.email}`, []);
  return Array.isArray(articles)
    ? articles.filter((article) => article && typeof article.url === "string")
    : [];
}

export async function toggleSavedArticle(user, article) {
  if (!user) throw new Error("Sign in to save articles.");
  const articles = getSavedArticles(user);
  const isSaved = articles.some((savedArticle) => savedArticle.url === article.url);
  const updatedArticles = isSaved
    ? articles.filter((savedArticle) => savedArticle.url !== article.url)
    : [...articles, article];
  writeJson(`${ARTICLES_PREFIX}${user.email}`, updatedArticles);
  return updatedArticles;
}
