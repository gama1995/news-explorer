# NewsExplorer

A responsive React application for finding news articles by keyword and keeping a personal collection of saved articles. Created by Daisy Gama for the TripleTen final project.

## Links

- [GitHub repository](https://github.com/gama1995/news-explorer)
- [Project design in Figma](https://www.figma.com/design/3ottwMEhlBt95Dbn8dw1NH/Your-Final-Project?node-id=0-1)
- Live deployment: pending.

## Features

- Search News API for articles from the previous seven days.
- Show loading, empty-result, and request-error states.
- Display three articles initially and reveal three more with each "Show more" click.
- Open original articles in a new tab.
- Register and sign in using frontend demo responses.
- Bookmark articles and remove them from the saved collection.
- Visit `/saved-news` to see the saved count, search keywords, and delete controls.
- Restore the demo session and saved articles from browser storage.
- Use responsive layouts, locally hosted fonts, and reusable popup components.
- Load compressed WebP photos, including a smaller background for mobile screens.

## Technology

React, React Router, Vite, JavaScript, CSS with BEM naming, Flexbox, Grid, the Fetch API, and News API. Roboto, Roboto Slab, and Inter are loaded locally with `@font-face`.

## Run locally

Use a Node.js version supported by Vite 8, such as Node.js 24, and npm.

```sh
npm install
```

Create `.env.local` beside `package.json`:

```env
VITE_NEWS_API_KEY=your_news_api_key
```

Get a key from [News API](https://newsapi.org/). `.env.local` is ignored by Git. Vite includes `VITE_` values in the browser bundle; this client-side key is not a server-side secret.

```sh
npm run dev
```

Open the Local URL printed in the terminal. Restart Vite after changing environment variables.

## Demo accounts

Stage 1 uses local frontend stubs rather than a real authentication backend. Use a sample email such as `demo@example.com` and any nonempty sample password to sign in. Registration lets you set the name shown in the header, then offers sign-in.

Passwords are not stored or checked against a real account. Demo profiles and saved articles are stored in this browser, with separate article collections for each email. This behavior is for reviewing the frontend, not production authentication.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The production build is written to `dist`. Local development uses `https://newsapi.org/v2/everything`; production uses the course-provided endpoint `https://nomoreparties.co/news/v2/everything`.

When deploying, set `VITE_NEWS_API_KEY` in the build environment. Configure the static host to serve `index.html` for client-side routes, including direct visits to `/saved-news`.

### Deploy to GitHub Pages

The repository includes `.github/workflows/deploy.yml`. It builds and deploys pushes to `stage-1-frontend-and-api` and, after acceptance and merge, `main`.

1. In the repository's Settings > Pages, set Source to **GitHub Actions**.
2. In Settings > Secrets and variables > Actions, add a repository secret named `VITE_NEWS_API_KEY` with your News API key as its value.
3. If the `github-pages` environment restricts deployment branches, allow `stage-1-frontend-and-api` during review. Keep `main` unmerged until instructor acceptance.
4. Commit and push the deployment files to the Stage 1 branch.
5. Watch the **Deploy NewsExplorer to GitHub Pages** workflow in Actions.
6. After successful deployment, test `https://gama1995.github.io/news-explorer/` and a direct visit to `https://gama1995.github.io/news-explorer/saved-news/`.
7. Replace the pending deployment entry above with the verified live URL.

The workflow runs `npm run build:pages`, which sets Vite's base to `/news-explorer/` and copies an HTML entry to `dist/saved-news/index.html`. React Router uses the same base, so links, assets, and saved-page refreshes work under the repository path. Local development and ordinary `npm run build` keep the root base `/`.

The existing `netlify.toml` is retained as an alternative hosting configuration.

## Project structure

```text
src/
  components/   Reusable interface and page components, with component CSS
  contexts/     Current user context
  images/       Photos, SVG icons, and fallback images
  utils/        News API requests, demo backend responses, and constants
  vendor/fonts/ Local fonts and @font-face declarations
```

## Submission workflow

Stage 1 development takes place on `stage-1-frontend-and-api`. Submit a pull request from that branch into `main`, push requested fixes to the same branch, and merge only after acceptance.
