const API_BASE = "http://localhost:5000/api";

// Helper function for API calls
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API call failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

// Account API calls
export const accountsAPI = {
  getUserAccounts: (userId) => apiCall(`/accounts/user/${userId}`),

  deposit: (accountId, amount, description = "") =>
    apiCall("/accounts/deposit", {
      method: "PUT",
      body: JSON.stringify({ accountId, amount, description }),
    }),

  withdraw: (accountId, amount, description = "") =>
    apiCall("/accounts/withdraw", {
      method: "PUT",
      body: JSON.stringify({ accountId, amount, description }),
    }),
};

// Transaction API calls
export const transactionsAPI = {
  getUserTransactions: (userId, limit = 4) =>
    apiCall(`/transactions/user/${userId}?limit=${limit}`),

  getAccountTransactions: (accountId, limit = 10) =>
    apiCall(`/transactions/account/${accountId}?limit=${limit}`),
};

// User API calls
export const userAPI = {
  login: (email, password) =>
    apiCall("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
