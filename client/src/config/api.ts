// Configuración centralizada de la API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  ENDPOINTS: {
    BOOKS: '/v1/books',
    USERS: '/v1/users',
    AUTH: '/v1/auth',
  }
} as const;

// Helper para construir URLs completas
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// URLs específicas más utilizadas
export const API_URLS = {
  // Books
  BOOKS_BASE: getApiUrl(API_CONFIG.ENDPOINTS.BOOKS),
  BOOKS_LANDING: getApiUrl(`${API_CONFIG.ENDPOINTS.BOOKS}/landing`),
  BOOKS_LANDING_SORTED: (sort: string) => getApiUrl(`${API_CONFIG.ENDPOINTS.BOOKS}/landing?sort=${sort}`),
  
  // Users
  USERS_BASE: getApiUrl(API_CONFIG.ENDPOINTS.USERS),
  USER_LOGIN: getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/login`),
  USER_REGISTER: getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/register`),
  USER_ME: getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/me`),
  USER_BASIC: getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/basicUser`),
  USER_PREMIUM: getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/premiumUser`),
  
  // Helper para URLs dinámicas
  getBookById: (id: string) => getApiUrl(`${API_CONFIG.ENDPOINTS.BOOKS}/${id}`),
  getUserBooks: (username: string) => getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/${username}/books`),
  getUserBook: (userId: string) => getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/book`),
  getBooksWithFilters: (filters?: string) => getApiUrl(`${API_CONFIG.ENDPOINTS.BOOKS}${filters ? `?${filters}` : ''}`),
  getBooksByEndpoint: (endpoint: string) => getApiUrl(`/v1/${endpoint}`),
} as const;
