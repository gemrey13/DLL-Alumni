import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "@/apiConfig";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
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
  let [userProfile, setUserProfile] = useState([]);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const promise = toast.promise(
      axios.post(
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
      ),
      {
        loading: "Please Wait...",
        success: <b>Success!</b>,
        error: <b>Error Credentials.</b>,
      }
    );
    try {
      const response = await promise;
      const data = response.data;

      if (data) {
        localStorage.setItem("authTokens", JSON.stringify(data));
        setAuthTokens(data);

        const userResponse = await axios.get(`${baseURL}/api/user-info/`, {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        const userData = userResponse.data;

        setUser(userData);
        setUserProfile(userData);
        toast.success("Login Successfully!");
        navigate("/admin");
      } else {
        toast.error("Something went wrong while logging in the user!");
      }
    } catch (error) {
      toast.error("Login error:", error);
    }
  };

  let logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    toast("Admin Logout!", {
      icon: "👋",
    });
    navigate("/");
  };

  const updateToken = async () => {
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

        const userResponse = await axios.get(`${baseURL}/api/user-info/`, {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        const userData = userResponse.data;
        setUser(userData);
        setUserProfile(userData);
        localStorage.setItem("authTokens", JSON.stringify(data));
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
    userProfile: userProfile,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
