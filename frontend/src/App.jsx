import { Suspense, lazy, useEffect, useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard";
import SignIn from "./pages/admin/Authentication/SignIn";
import SignUp from "./pages/admin/Authentication/SignUp";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Loader from "./common/Loader";
import adminroutes from "./routes/adminroutes";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      
      <AuthProvider>
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route
            path="/admin/"
            element={
              <PrivateRoute>
                  <DefaultLayout />
              </PrivateRoute>
            }>
            <Route index element={<Dashboard />} />
            {adminroutes.map((adminroutes, index) => {
              const { path, component: Component } = adminroutes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>

          {/* <Route path="/c/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            {clientroutes.map((clientroutes, index) => {
              const {
                path,
                component: Component
              } = clientroutes;
              return <Route key={index} path={path} element={<Suspense fallback={<Loader />}>
                <Component />
              </Suspense>} />;
            })}
        </Route> */}

          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
