import { useEffect, useState, lazy, Suspense, startTransition } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import adminroutes from "./routes/adminroutes";
import landingroutes from "./routes/landingroutes";
import userroutes from "./routes/userroutes";
import Dashboard from "./pages/admin/Dashboard";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Loader from "./common/Loader";
import JobPage from "./pages/user/JobPage";

const AdminLayout = lazy(() => import("./layout/AdminLayout"));
// const LandingLayout = lazy(() => import("./layout/LandingLayout"));
const UserLayout = lazy(() => import("./layout/UserLayout"));

import LandingLayout from "./layout/LandingLayout";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    return loading ? (
        <div className="h-screen">
            <Loader />
        </div>
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
                                <AdminLayout />
                            </PrivateRoute>
                        }>
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <Dashboard />
                                </Suspense>
                            }
                        />
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

                    <Route path="/u/" element={<UserLayout />}>
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <JobPage />
                                </Suspense>
                            }
                        />
                        {userroutes.map((userroutes, index) => {
                            const { path, component: Component } = userroutes;
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

                    <Route path="/" element={<LandingLayout />}>
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <LandingPage />
                                </Suspense>
                            }
                        />
                        {landingroutes.map((landingroutes, index) => {
                            const { path, component: Component } =
                                landingroutes;
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

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </>
    );
}
export default App;
