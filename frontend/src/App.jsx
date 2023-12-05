import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'

import PrivateRoute from './utils/PrivateRoute'
import Dashboard from './pages/admin/Dashboard'

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
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/" exact element={<LandingPage/>}/>
                        <Route path="/admin" element={<Dashboard/>}/>

                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;