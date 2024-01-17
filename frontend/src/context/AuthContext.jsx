import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "@/apiConfig";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/api/token/`,
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      const promise = toast.promise(Promise.resolve(data), {
        loading: "Please Wait...",
        success: <b>Login Successfully!</b>,
        error: <b>Error Credentials.</b>,
      });

      await promise;

      if (data) {
        localStorage.setItem("authTokens", JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        const temp = jwtDecode(data.access);
        if (temp.is_staff) {
          navigate("/admin");
        } else {
          navigate("/u/");
        }
      } else {
        toast.error("Something went wrong while logging in the user!");
      }
    } catch (error) {
      toast.error("Login errors:", error);
    }
  };

  let logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    toast("Logout!", {
      icon: "👋",
    });
    navigate("/");
  };

  let updateToken = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/api/token/refresh/`,
        {
          refresh: authTokens?.refresh,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("Updated");
      } else {
        logoutUser();
      }

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      logoutUser();
    }
  };

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [authTokens]);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    updateToken: updateToken,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
