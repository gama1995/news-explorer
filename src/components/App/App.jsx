import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import heroImage from "../../images/hero.webp";
import heroMobileImage from "../../images/hero-mobile.webp";
import About from "../About/About.jsx";
import "./App.css";
import Footer from "../Footer/Footer.jsx";
import NewsResults from "../NewsResults/NewsResults.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { searchNews } from "../../utils/NewsApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { getDemoSession, getSavedArticles, register, signIn, signOut, toggleSavedArticle } from "../../utils/mockApi.js";
import {
  ARTICLES_PER_BATCH,
  REQUEST_TIMEOUT_MS,
  SEARCH_ERROR_MESSAGE,
} from "../../utils/constants.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [activeModal, setActiveModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(getDemoSession);
  const [savedArticles, setSavedArticles] = useState(() => getSavedArticles(getDemoSession()));
  const [pendingArticleUrls, setPendingArticleUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [actionError, setActionError] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_BATCH);
  const [searchError, setSearchError] = useState("");
  const searchController = useRef(null);

  useEffect(() => {
    return () => {
      searchController.current?.abort();
      searchController.current = null;
    };
  }, []);

  async function handleSearch(keyword) {
    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    setSearchStatus("loading");
    setSearchError("");
    setArticles([]);
    setVisibleCount(ARTICLES_PER_BATCH);

    try {
      const results = await searchNews(keyword, controller.signal);
      if (searchController.current !== controller) return;
      setArticles(results.map((article) => ({ ...article, keyword })));
      setSearchStatus("success");
    } catch {
      if (searchController.current !== controller) return;
      setSearchError(SEARCH_ERROR_MESSAGE);
      setSearchStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  function handleShowMore() {
    setVisibleCount((count) => Math.min(count + ARTICLES_PER_BATCH, articles.length));
  }

  function handleOpenLogin() {
    setAuthError("");
    setActiveModal("login");
  }

  function handleOpenRegister() {
    setAuthError("");
    setActiveModal("register");
  }

  function handleCloseModal() {
    if (isSubmitting) return;
    setAuthError("");
    setActiveModal(null);
    if (location.state?.openLogin) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }

  async function handleLogin(values) {
    setIsSubmitting(true);
    setAuthError("");
    try {
      const user = await signIn(values);
      setCurrentUser(user);
      setSavedArticles(getSavedArticles(user));
      setActionError("");
      setActiveModal(null);
      navigate(location.state?.from || location.pathname, { replace: true, state: null });
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(values) {
    setIsSubmitting(true);
    setAuthError("");
    try {
      await register(values);
      setActiveModal("registration-success");
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSignOut() {
    try {
      signOut();
      setCurrentUser(null);
      setSavedArticles([]);
      setActionError("");
      navigate("/", { replace: true, state: null });
    } catch (error) {
      setActionError(error.message);
    }
  }

  async function handleToggleSave(article) {
    if (!currentUser) {
      handleOpenLogin();
      return;
    }
    if (pendingArticleUrls.includes(article.url)) return;
    setPendingArticleUrls((urls) => [...urls, article.url]);
    setActionError("");
    try {
      setSavedArticles(await toggleSavedArticle(currentUser, article));
    } catch (error) {
      setActionError(error.message);
    } finally {
      setPendingArticleUrls((urls) => urls.filter((url) => url !== article.url));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {isHomePage ? (
          <div
            className="hero"
            style={{
              "--hero-image": `url(${heroImage})`,
              "--hero-image-mobile": `url(${heroMobileImage})`,
            }}
          >
            <Header onSignIn={handleOpenLogin} onSignOut={handleSignOut} />
            <SearchForm onSearch={handleSearch} isLoading={searchStatus === "loading"} />
          </div>
        ) : (
          <Header onSignIn={handleOpenLogin} onSignOut={handleSignOut} isLight />
        )}

        <main>
          {actionError && <p className="app__error" role="alert">{actionError}</p>}
          <Routes>
            <Route path="/" element={
              <>
                <NewsResults
                  status={searchStatus}
                  articles={articles}
                  visibleCount={visibleCount}
                  error={searchError}
                  onShowMore={handleShowMore}
                  onSignIn={handleOpenLogin}
                  onToggleSave={handleToggleSave}
                  savedArticles={savedArticles}
                  pendingArticleUrls={pendingArticleUrls}
                />
                <About />
              </>
            } />
            <Route path="/saved-news" element={
              <ProtectedRoute>
                <SavedNews articles={savedArticles} onDelete={handleToggleSave} pendingArticleUrls={pendingArticleUrls} />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        {(activeModal === "login" || (!activeModal && location.state?.openLogin)) && <LoginModal
          isOpen
          onClose={handleCloseModal}
          onRegister={handleOpenRegister}
          onLogin={handleLogin}
          isSubmitting={isSubmitting}
          error={authError}
        />}
        {activeModal === "register" && <RegisterModal
          isOpen
          onClose={handleCloseModal}
          onLogin={handleOpenLogin}
          onRegister={handleRegister}
          isSubmitting={isSubmitting}
          error={authError}
        />}
        {activeModal === "registration-success" && (
          <ModalWithForm title="Registration successfully completed!" isOpen onClose={handleCloseModal} onSubmit={(event) => event.preventDefault()}>
            <button className="modal__switch-button" type="button" onClick={handleOpenLogin}>Sign in</button>
          </ModalWithForm>
        )}
      </div>
    </CurrentUserContext.Provider>
   
  );
}

export default App;
