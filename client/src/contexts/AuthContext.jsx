// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser, registerUser, logoutUser } from "../api/auth";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = sessionStorage.getItem("access_token");
//         if (token) {
//           // const userData = await getCurrentUser();
//           // setUser(userData);
//         }
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       await loginUser(credentials);
//       // const userData = await getCurrentUser();
//       const userData  = 'name';
//       setUser(userData);
//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       const errorMessage =
//         error.message || "Login failed. Please try again.";
//       alert(errorMessage);
//     }
//   };

//   const register = async (userData) => {
//     // console.log("auth provider" , userData)
//     try {
//       const data = await registerUser(userData);
//       // const userInfo = await getCurrentUser();
//       const userInfo= 'user';
//       setUser(userInfo);
//       alert(data.message || "Registration successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       let errorMessage = "Registration failed. Please try again.";
//       if (error.response?.data) {
//         if (typeof error.response.data === "object" && !Array.isArray(error.response.data)) {
//           errorMessage = "Registration errors:\n\n";
//           for (const [field, errors] of Object.entries(error.response.data)) {
//             errorMessage += `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}\n`;
//           }
//         } else {
//           errorMessage = error.response.data.message || error.response.data.detail || error.message;
//         }
//       } else {
//         errorMessage = error.message;
//       }
//       alert(errorMessage);
//     }
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       alert("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, logoutUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        if (token) {
          // Optionally verify token with backend here if needed
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      await loginUser(credentials);
      setIsLoggedIn(true);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setIsLoggedIn(false);
      alert(error.message || "Login failed. Please try again.");
    }
  };

  const register = async (userData) => {
    try {
      await registerUser(userData);
      setIsLoggedIn(true);
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      setIsLoggedIn(false);
      let errorMessage = "Registration failed. Please try again.";
      if (error.response?.data) {
        if (typeof error.response.data === "object" && !Array.isArray(error.response.data)) {
          errorMessage = "Registration errors:\n\n";
          for (const [field, errors] of Object.entries(error.response.data)) {
            errorMessage += `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}\n`;
          }
        } else {
          errorMessage = error.response.data.message || error.response.data.detail || error.message;
        }
      }
      alert(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);