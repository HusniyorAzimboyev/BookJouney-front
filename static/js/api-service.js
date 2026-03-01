// API Service - Handles all API calls with Basic Authentication
class APIService {
  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL;
    this.endpoint = CONFIG.API_ENDPOINT;
    this.timeout = CONFIG.API_TIMEOUT;
    this.basicAuth = this.encodeBasicAuth(
      CONFIG.BASIC_AUTH.username,
      CONFIG.BASIC_AUTH.password
    );
  }

  // Encode credentials for Basic Auth
  encodeBasicAuth(username, password) {
    const credentials = `${username}:${password}`;
    return 'Basic ' + btoa(credentials);
  }

  // Fetch books from API with pagination
  async getBooks(page = 1, limit = 12) {
    try {
      const url = `${this.baseUrl}${this.endpoint}?page=${page}&limit=${limit}`;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': this.basicAuth,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        books: data.results || [],
        count: data.count || 0,
        next: data.next,
        previous: data.previous
      };
    } catch (error) {
      console.error('Error fetching books from API:', error);
      return {
        success: false,
        error: error.message,
        books: [],
        count: 0
      };
    }
  }

  // Simple test helper: fetch and log books
  async testApiFetch(page = 1, limit = 12) {
    const result = await this.getBooks(page, limit);
    console.log('API test result:', result);
    return result;
  }

  // Fetch single book by ID
  async getBook(id) {
    try {
      const url = `${this.baseUrl}${this.endpoint}${id}/`;
      const controller = new AbortController();
      const idTimeout = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': this.basicAuth,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      clearTimeout(idTimeout);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error fetching book:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Search books
  async searchBooks(query, page = 1) {
    try {
      const url = `${this.baseUrl}${this.endpoint}?search=${encodeURIComponent(query)}&page=${page}`;
      const controller = new AbortController();
      const idTimeout = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': this.basicAuth,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      clearTimeout(idTimeout);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        books: data.results || [],
        count: data.count || 0
      };
    } catch (error) {
      console.error('Error searching books:', error);
      return {
        success: false,
        error: error.message,
        books: [],
        count: 0
      };
    }
  }

  // Filter books by genre
  async getBooksByGenre(genre, page = 1) {
    try {
      const url = `${this.baseUrl}${this.endpoint}?genre=${encodeURIComponent(genre)}&page=${page}`;
      const controller = new AbortController();
      const idTimeout = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': this.basicAuth,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      clearTimeout(idTimeout);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        books: data.results || [],
        count: data.count || 0
      };
    } catch (error) {
      console.error('Error fetching books by genre:', error);
      return {
        success: false,
        error: error.message,
        books: [],
        count: 0
      };
    }
  }
}

// Create global instance
const apiService = new APIService();

// Expose a convenient global test function
window.testApiFetch = async function(page = 1, limit = 12) {
  try {
    const res = await apiService.testApiFetch(page, limit);
    console.log('testApiFetch result:', res);
    return res;
  } catch (err) {
    console.error('testApiFetch error:', err);
    throw err;
  }
};
