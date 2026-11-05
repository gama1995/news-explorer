# NewsExplorer Stage 2 API

The backend registers users, issues sign-in tokens, and stores saved news articles in MongoDB. The React frontend is developed separately on the Stage 1 branch.

## Run locally

Install Node.js 20 or later and start a local MongoDB server on port 27017. From this directory:

```sh
npm ci
npm run dev
```

The API listens at http://localhost:3000 and reloads on source changes. Use `npm start` to start without reloading. Local development uses the `news-explorer` database and works without an environment file. Run `npx eslint .` to check the code.

## Endpoints

Every path below also works under `/api`. Send JSON for POST requests. Protected routes require the header `Authorization: Bearer <token>`.

| Method and path | Body or result | Authentication |
| --- | --- | --- |
| POST /signup | Accepts `email`, `password`, and `name`. Returns the created user ID, email, and name. | Public |
| POST /signin | Accepts `email` and `password`. Returns `{ "token": "..." }`. | Public |
| GET /users/me | Returns the signed-in user's email and name. | Required |
| GET /articles | Returns articles saved by the signed-in user. | Required |
| POST /articles | Accepts `keyword`, `title`, `text`, `date`, `source`, `link`, and `image`. | Required |
| DELETE /articles/:articleId | Returns the deleted article. Only its owner can delete it. | Required |

Passwords must contain at least eight characters and fit within 72 UTF-8 bytes. Names must contain 2–30 characters. Article links and images must use HTTP or HTTPS. API errors return an appropriate HTTP status and a JSON object with a `message` field.

## Production deployment

Public API URL is pending deployment. Record the verified HTTPS URL here before submitting the project.

1. Provision a MongoDB database and deploy the backend to the application host. Run `npm ci --omit=dev` on the host.
2. Copy `.env.example` to `.env` on the host. Set `MONGODB_URI` to the production connection string and set `JWT_SECRET` to a fresh value. Generate it with `node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))"`. Keep `.env` private.
3. Start `npm start` with your host's process manager and give the process write access to its working directory for `request.log` and `error.log`.
4. Route HTTPS requests on your domain to the app through your reverse proxy. Preserve the `/api` prefix when forwarding to port 3000. Set `TRUST_PROXY` to the trusted proxy hop count for your deployment. The example assumes one proxy directly in front of the app. For a platform that requires an external bind, set `HOST=0.0.0.0`.
5. Set `CORS_ORIGINS` to the frontend origins allowed to call the API, separated by commas. Verify signup, signin, and a protected request at the deployed HTTPS URL.

The application logs HTTP methods, paths, response statuses, and timing. It keeps passwords, tokens, and request bodies out of the logs.
