// frontend/src/pages/Requests.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function Requests() {
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);

    async function load() {
        const res = await api.get('/swap-requests');
        setIncoming(res.data.incoming);
        setOutgoing(res.data.outgoing);
    }

    useEffect(() => { load(); }, []);

    async function respond(id, accept) {
        await api.post(`/swap-response/${id}`, { accept });
        load();
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Incoming Requests</h2>
            {incoming.map(r => (
                <div key={r._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 6 }}>
                    <div>From: {r.requesterId.name}</div>
                    <div>Offered: {r.mySlotId.title} → Wants {r.theirSlotId.title}</div>
                    <div>Status: {r.status}</div>
                    {r.status === 'PENDING' && (
                        <>
                            <button onClick={() => respond(r._id, true)}>Accept</button>
                            <button onClick={() => respond(r._id, false)}>Reject</button>
                        </>
                    )}
                </div>
            ))}

            <h2>Outgoing Requests</h2>
            {outgoing.map(r => (
                <div key={r._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 6 }}>
                    <div>To: {r.responderId.name}</div>
                    <div>You offered: {r.mySlotId.title} → Their {r.theirSlotId.title}</div>
                    <div>Status: {r.status}</div>
                </div>
            ))}
        </div>
    );
}

