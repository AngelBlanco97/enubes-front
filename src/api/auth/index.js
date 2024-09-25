import { apiRequest } from "@/utils/apiRequest";

class AuthApi {
  /**
   * Signs in an authenticated user
   *
   * @param {object} request - The request object
   * @param {string} request.email - The email address
   * @param {string} request.password - The password
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async signIn(request) {
    const { email, password } = request;

    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Log out an authenticated user
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async signOut() {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  }

  /**
   * Create a new user account
   *
   * @param {object} request - The request object
   * @param {string} request.email - The email address
   * @param {string} request.password - The password
   * @param {string} request.firstName - The first name
   * @param {string} request.lastName - The last name
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async registerUser(
    email,
    password,
    firstName,
    lastName,
    phone,
    password_confirm
  ) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        password_confirm,
      }),
    });
  }

  /**
   * Get the current user
   * @returns {Promise} The response object
   * @throws {Error} The error object
   */
  async me() {
    return apiRequest("/me");
  }
}

export const authApi = new AuthApi();
