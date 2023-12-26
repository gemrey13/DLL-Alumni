import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import baseURL from '@/apiConfig'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [userInfo, setUserInfo] = useState(authTokens?.userInfo || null)
    let [loading, setLoading] = useState(true)

    
    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${baseURL}/api/token/`, {
                username: e.target.username.value,
                password: e.target.password.value,
            },{
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = response.data;

            if(data){
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                navigate('/admin')
            } else {
                alert('Something went wrong while loggin in the user!')
            }
        } catch (error) {
            console.error(error)
        }
    };

    let logoutUser = (e) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/')
    };

    const updateToken = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/token/refresh/`, {
                refresh: authTokens?.refresh,
            }, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
        
            const data = response.data;
        
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                logoutUser();
            }
        
            if (loading) {
                setLoading(false);
            }
        } catch (error) {
            console.error('Token refresh failed', error);
            logoutUser();
        }
    };
      
    useEffect(() => {
        setUserInfo(authTokens?.userInfo || null);

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
        userInfo: userInfo,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}