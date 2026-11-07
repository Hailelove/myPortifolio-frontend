const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function apiClient(endpoint, options = {}) {
  const { body, headers, ...customConfig } = options;

  const config = {
    method: body ? "POST" : "GET",
    credentials: "include", // Ensures httpOnly cookies (portfolio_admin_session) are sent/received
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || "An unexpected error occurred.",
      response.status,
      data,
    );
  }

  return data;
}
