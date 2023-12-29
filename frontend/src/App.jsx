import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard";
import SignIn from "./pages/admin/Authentication/SignIn";
import SignUp from "./pages/admin/Authentication/SignUp";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Loader from "./common/Loader";
import adminroutes from "./routes/adminroutes";
// import clientroutes from './routes/clientroutes';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
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

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import { AuthProvider } from './context/AuthContext'

// import './App.css'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import Header from './components/Header'
// import LandingPage from './pages/LandingPage'

// import PrivateRoute from './utils/PrivateRoute'
// import AdminPage from './pages/admin/AdminPage'
// import TraceAlumni from './pages/admin/TraceAlumni'

// function App() {
//     return (
//         <div className="App">
//             <Router>
//                 <AuthProvider>
//                     {/* <Header/> */}
//                     <Routes>
//                         {/* <Route path="/" element={
//                             <PrivateRoute>
//                                 <HomePage/>
//                             </PrivateRoute>} /> */}
//                         <Route path="/login" element={<LoginPage />} />
//                         <Route exact path="/" element={<LandingPage />} />
//                         <Route path='/admin/*' element={<AdminPage/>}></Route>
//                     </Routes>
//                 </AuthProvider>
//             </Router>
//             {/* <Router basename='/admin'>
//                 <AdminPage />
//             </Router> */}
//         </div>
//     );
// }

// export default App;
