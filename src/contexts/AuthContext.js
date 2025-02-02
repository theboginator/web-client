import { useColorMode } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "services/auth";
import { initialiseUserPreferences } from "services/userPreferences";
import setThemeColors from "utilities/setThemeColors";
import secureApiFetch from '../services/api';

const AuthContext = createContext();

function useAuth() {
    const navigate = useNavigate();
    const { setColorMode } = useColorMode();

    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    const [user, setUser] = useState(Auth.getLoggedInUser());

    return {
        user,
        isAuth,

        login(credentials) {
            const formData = new FormData();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);

            return secureApiFetch(`/users/login`, {
                method: 'POST',
                body: formData
            })
                .then(resp => {
                    if (resp.status === 403) {
                        throw new Error('Invalid username or password');
                    }
                    if (resp.status !== 200) {
                        throw new Error('Invalid response from the server');
                    }
                    return resp.json();
                })
                .then(data => {
                    data.preferences = initialiseUserPreferences(data);

                    localStorage.setItem('isAuth', true);
                    localStorage.setItem('user', JSON.stringify(data));

                    setUser(data);

                    setThemeColors(data.preferences['web-client.theme']);
                    setColorMode(data.preferences['web-client.theme']);

                    if (data.mfa === 'setup') {
                        navigate('/auth/mfa-setup');
                        return;
                    } else if (data.mfa === 'ready') {
                        navigate('/auth/mfa-verification');
                        return;
                    }

                    // eg mfa == disabled
                    setIsAuth(true);
                })
                .catch(err => {
                    throw err;
                });
        },

        logout() {
            setIsAuth(false);

            secureApiFetch(`/users/logout`, {
                method: 'POST',
            })
                .finally(() => {
                    Auth.removeSession();
                    setThemeColors('dark');
                    setColorMode('dark');
                });
        }
    };
}

const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer;

export { useAuth, AuthContext, AuthProvider, AuthConsumer };

