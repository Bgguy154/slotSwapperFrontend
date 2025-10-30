// frontend/src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    async function submit(e) {
        e.preventDefault();
        try {
            await signup(form);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Signup failed');
        }
    }

    return (
        <form onSubmit={submit} style={{ padding: 20 }}>
            <h2>Sign up</h2>
            <div><input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
            <button type="submit">Sign up</button>
        </form>
    );
}
