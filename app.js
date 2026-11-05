const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const config = require('./config');
const rateLimiter = require('./config/rate-limiter');
const { logRequest } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');
const User = require('./models/user');
const Article = require('./models/article');

const app = express();

app.set('trust proxy', config.trustProxy);
app.use(logRequest);
app.use(helmet());
app.use(cors({ origin: config.corsOrigins }));
app.use(rateLimiter);
app.use(express.json({ limit: '64kb' }));
app.use(['/api', '/'], routes);
app.use(errorHandler);

async function start() {
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
  await Promise.all([User.init(), Article.init()]);
  app.listen(config.port, config.host, () => {
    process.stdout.write(`NewsExplorer API listening on ${config.host}:${config.port}\n`);
  });
}

if (require.main === module) {
  start().catch(() => {
    process.stderr.write('Could not initialize MongoDB. Check the connection and database permissions.\n');
    mongoose.disconnect().finally(() => { process.exitCode = 1; });
  });
}

module.exports = app;
