import { apiClient } from "../lib/api-client";
export const contactService = {
  // Public submission (with rate limit protection on backend)
  submitMessage: async (formData) => {
    return apiClient("/contact", {
      method: "POST",
      body: formData,
    });
  },

  // Admin: List messages with optional pagination, search, or status filter
  listMessages: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/contact?${query}`);
  },

  // Admin: Get single message details (automatically marks as READ on backend)
  getMessageById: async (id) => {
    return apiClient(`/contact/${id}`);
  },

  // Admin: Update message status (NEW, READ, REPLIED, ARCHIVED)
  updateStatus: async (id, status) => {
    return apiClient(`/contact/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },

  // Admin: Delete a contact message
  deleteMessage: async (id) => {
    return apiClient(`/contact/${id}`, {
      method: "DELETE",
    });
  },
};
