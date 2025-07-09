import axios from "axios";

// const API_URL = "http://localhost:8000/api/auth";
const API_URL = `${import.meta.env.VITE_API_URL_PROD}/api/auth`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies for refresh token
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await refreshToken();
        const newAccessToken = data.access_token;
        sessionStorage.setItem("access_token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear all auth data if refresh fails
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("device_uuid");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("isLoggedIn");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// API calls
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login/", {
      email: credentials.email,
      password: credentials.password,
    });

    const { access_token, device_uuid , role} = response.data;
    if (!access_token || !device_uuid) {
      throw new Error("Invalid response format from server");
    }

    // Store auth data and set login status
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("device_uuid", device_uuid);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("isLoggedIn", "true");

    return { success: true };
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.non_field_errors?.[0] ||
      error.response?.data?.detail ||
      "Login failed. Please check your credentials."
    );
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register/", {
      full_name: userData.full_name,
      email: userData.email,
      phone_number: userData.phone_number,
      password: userData.password,
      role: userData.role || "consumer"
    });

    const { access_token, device_uuid , role} = response.data;
    if (!access_token || !device_uuid) {
      throw new Error("Invalid response format from server");
    }

    // Store auth data and set login status (auto-login after registration)
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("device_uuid", device_uuid);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("isLoggedIn", "true");

    return { 
      success: true,
      message: response.data.message || "Registration successful"
    };
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    
    let errorMessage = "Registration failed. Please try again.";
    if (error.response?.data) {
      if (typeof error.response.data === "object") {
        // Handle field-specific errors
        if (error.response.data.email) {
          errorMessage = `Email: ${error.response.data.email.join(", ")}`;
        } else if (error.response.data.password) {
          errorMessage = `Password: ${error.response.data.password.join(", ")}`;
        }
        // Handle non-field errors
        else if (error.response.data.non_field_errors) {
          errorMessage = error.response.data.non_field_errors.join(", ");
        }
      } else if (error.response.data.detail) {
        errorMessage = error.response.data.detail;
      }
    }

    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/logout/");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  } finally {
    // Clear all auth data regardless of API call success
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("device_uuid");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isLoggedIn");
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/token/refresh/");
    const { access_token } = response.data;
    sessionStorage.setItem("access_token", access_token);
    return response.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};