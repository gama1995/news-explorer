module.exports = {
  messages: {
    invalidInput: 'The request contains invalid data.',
    invalidCredentials: 'Incorrect email or password.',
    unauthorized: 'A valid Bearer token is required.',
    forbidden: 'You can only delete articles you saved.',
    userNotFound: 'User not found.',
    articleNotFound: 'Article not found.',
    routeNotFound: 'Route not found.',
    duplicateEmail: 'An account already exists for this email.',
    serverError: 'An unexpected server error occurred.',
    payloadTooLarge: 'The request body is too large.',
    rateLimit: 'Too many requests. Please try again later.',
  },
  isHttpUrl: (value) => {
    try {
      const url = new URL(value);
      return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
    } catch {
      return false;
    }
  },
};
