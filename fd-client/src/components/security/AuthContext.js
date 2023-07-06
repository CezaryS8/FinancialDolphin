import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken && storedUsername) {
      setAuthenticated(true);
      setUsername(storedUsername);
      setToken(storedToken);
      apiClient.defaults.headers.common["Authorization"] = storedToken;
    }
  }, [isAuthenticated]);

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(username, password);

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.access_token;

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("username", username);

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setAuthenticated(false);
    setToken(null);
    setUsername(null);
    delete apiClient.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}
