// Configuration file - loads environment variables
const CONFIG = {
  API_BASE_URL: 'http://localhost:8080/',
  API_ENDPOINT: 'api/v1/book/',
  API_TIMEOUT: 5000,
  BASIC_AUTH: {
    username: '13521',
    password: '13521'
  },
  NODE_ENV: 'development',
  FEATURES: {
    ENABLE_PDF_UPLOAD: true,
    ENABLE_BOOK_CATALOG: true,
    ENABLE_AI_FEATURES: true,
    ENABLE_PREMIUM_FEATURES: true
  }
};

// Make it available globally
window.CONFIG = CONFIG;
