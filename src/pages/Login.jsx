// frontend/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    async function submit(e) {
        e.preventDefault();
        try {
            await login(form);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <form onSubmit={submit} style={{ padding: 20 }}>
            <h2>Login</h2>
            <div><input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
            <button type="submit">Login</button>
        </form>
    );
}
