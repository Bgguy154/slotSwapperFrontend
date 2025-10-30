// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import EventCard from '../components/EventCard';

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title: '', startTime: '', endTime: '' });

    async function load() {
        const res = await api.get('/events');
        setEvents(res.data);
    }

    useEffect(() => { load(); }, []);

    async function create(e) {
        e.preventDefault();
        await api.post('/events', { title: form.title, startTime: form.startTime, endTime: form.endTime });
        setForm({ title: '', startTime: '', endTime: '' });
        load();
    }

    async function toggle(ev) {
        const newStatus = ev.status === 'SWAPPABLE' ? 'BUSY' : 'SWAPPABLE';
        await api.put(`/events/${ev._id}`, { status: newStatus });
        load();
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>My Events</h2>
            <form onSubmit={create}>
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <input type="datetime-local" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
                <input type="datetime-local" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} />
                <button type="submit">Create</button>
            </form>

            <div style={{ marginTop: 20 }}>
                {events.map(ev => <EventCard key={ev._id} ev={ev} onToggleSwappable={toggle} />)}
            </div>
        </div>
    );
}
