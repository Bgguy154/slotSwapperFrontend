// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const s = localStorage.getItem('slot_user');
        return s ? JSON.parse(s) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('slot_token'));

    useEffect(() => {
        setAuthToken(token);
        if (token) localStorage.setItem('slot_token', token); else localStorage.removeItem('slot_token');
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem('slot_user', JSON.stringify(user)); else localStorage.removeItem('slot_user');
    }, [user]);

    const login = async ({ email, password }) => {
        const res = await api.post('/auth/login', { email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        return res;
    };

    const signup = async (payload) => {
        const res = await api.post('/auth/signup', payload);
        setToken(res.data.token);
        setUser(res.data.user);
        return res;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
