import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);

  return !user ? <Navigate to="/auth/signin" /> : children;
};

export default PrivateRoute;
