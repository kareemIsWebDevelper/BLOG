'use client';
import {createContext, useContext, useEffect, useState} from 'react';


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: ProviderProp) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated');
        if (isAuthenticated === 'true') {
            setAuthenticated(true);
        }
    }, []);

    const login = () => {
        // Perform login logic here
        localStorage.setItem('authenticated', 'true');
        setAuthenticated(true);
    };

    const logout = () => {
        // Perform logout logic here
        localStorage.removeItem('authenticated');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{authenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};