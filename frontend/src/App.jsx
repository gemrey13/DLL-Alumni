import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'

import PrivateRoute from './utils/PrivateRoute'
import AdminPage from './pages/admin/AdminPage'
import TraceAlumni from './pages/admin/TraceAlumni'

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    {/* <Header/> */}
                    <Routes>
                        {/* <Route path="/" element={
                            <PrivateRoute>
                                <HomePage/>
                            </PrivateRoute>} /> */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route exact path="/" element={<LandingPage />} />
                    </Routes>
                </AuthProvider>

            </Router>
            <Router basename='/admin'>
                <AdminPage />
            </Router>
        </div>
    );
}

export default App;