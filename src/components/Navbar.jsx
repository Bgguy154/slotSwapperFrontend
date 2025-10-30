// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav style={{ padding: 12, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to="/">SlotSwapper</Link>
            </div>
            <div>
                {user ? (
                    <>
                        <Link to="/dashboard" style={{ marginRight: 8 }}>Dashboard</Link>
                        <Link to="/marketplace" style={{ marginRight: 8 }}>Marketplace</Link>
                        <Link to="/requests" style={{ marginRight: 8 }}>Requests</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
                        <Link to="/signup">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
