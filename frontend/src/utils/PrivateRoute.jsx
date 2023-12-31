import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth/signin" />;
  } else if (!user.is_staff) {
    return <Navigate to="/social" />;
  }

  return children;
};

export default PrivateRoute;
