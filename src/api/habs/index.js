const { apiRequest } = require("@/utils/apiRequest");

class HabsApi {
  /**
   * Get habs with filters
   *
   * @param {object} filters - The filters object
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async getHabs(filters) {
    return apiRequest("/habs", {
      method: "POST",
      body: JSON.stringify(filters),
    });
  }

  /**
   * Get current categories of habs available
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async getCategoriesHabs() {
    return apiRequest("/habs/categories", {
      method: "GET",
    });
  }

  /**
   * Get current hab
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async getHabInfo(slug) {
    return apiRequest(`/habs/${slug}`, {
      method: "GET",
    });
  }

  /**
   * Reserve hab
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async reserveHab(id, from, to) {
    return apiRequest(`/habs/${id}/reserve`, {
      method: "POST",
      body: JSON.stringify({ from, to }),
    });
  }

  /**
   * Get reservation
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async getReservation(id) {
    return apiRequest(`/reservations/${id}`, {
      method: "GET",
    });
  }
}

export const habsApi = new HabsApi();
