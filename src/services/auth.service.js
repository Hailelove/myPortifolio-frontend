import { apiClient } from "../lib/api-client";

export const authService = {
  async login(identifier, password) {
    return apiClient("/auth/login", {
      method: "POST",
      body: { identifier, password },
    });
  },

  async logout() {
    return apiClient("/auth/logout", {
      method: "POST",
    });
  },

  async getCurrentAdmin() {
    return apiClient("/auth/me", {
      method: "GET",
    });
  },
};
