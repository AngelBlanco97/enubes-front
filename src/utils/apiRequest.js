import axios from "axios";
import queryString from "query-string";

const STORAGE_KEY = "access_token";

const DEFAULT_OPTIONS = {
  useToken: true,
  params: {},
};

/**
 * Helper function to make a request to the API.
 * @param {String} url - The URL to make the request to (i.e. "auth/login").
 * @param {Object} options - The options to pass to the fetch request.
 * @param {String} options.method - The HTTP method to use (i.e. "GET", "POST").
 * @param {Object} options.params - The query params to pass to the request.
 * @param {Object} options.body - The body of the request.
 * @param {Object} options.headers - The headers of the request.
 * @param {Object} options.useToken - Whether to use the token from localStorage.
 * @returns {Promise} - The response from the API.
 */
export const apiRequest = async (url, options = DEFAULT_OPTIONS) => {
  const { useToken, locale, params, ...rest } = options;
  const includeToken = useToken || useToken === undefined;

  if (includeToken) {
    const token = globalThis?.localStorage?.getItem(STORAGE_KEY);
    if (!token) {
      rest.headers = {
        ...rest.headers,
      };
    }
    if (token) {
      rest.headers = {
        ...rest.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const urlWithParams = queryString.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_URL}${
      url.startsWith("/") ? url : `/${url}`
    }`,
    query: params,
  });

  return await axios({
    url: urlWithParams,
    method: rest.method || "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...rest.headers,
    },
    data: rest.body,
  });
};
