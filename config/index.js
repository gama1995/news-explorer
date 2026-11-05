const dotenv = require('dotenv');

dotenv.config();

const { env } = process;
const isProduction = env.NODE_ENV === 'production';

if (isProduction && (!env.MONGODB_URI || !env.JWT_SECRET || env.JWT_SECRET.length < 32)) {
  throw new Error('Production requires MONGODB_URI and a JWT_SECRET of at least 32 characters.');
}

module.exports = {
  port: Number(env.PORT || 3000),
  host: env.HOST || '127.0.0.1',
  mongoUri: env.MONGODB_URI || 'mongodb://127.0.0.1:27017/news-explorer',
  jwtSecret: env.JWT_SECRET || 'news-explorer-local-development-only',
  jwtIssuer: 'news-explorer-api',
  corsOrigins: (env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  trustProxy: Number(env.TRUST_PROXY || 0),
};
