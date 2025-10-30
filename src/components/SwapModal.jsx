// frontend/src/components/SwapModal.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function SwapModal({ open, onClose, targetSlot, onSuccess }) {
    const [mySwappables, setMySwappables] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;
        let mounted = true;
        (async () => {
            try {
                const res = await api.get('/events');
                if (!mounted) return;
                setMySwappables(res.data.filter(e => e.status === 'SWAPPABLE'));
            } catch (e) {
                console.error(e);
            }
        })();
        return () => { mounted = false; };
    }, [open]);

    async function submit(slotId) {
        try {
            setLoading(true);
            await api.post('/swap-request', { mySlotId: slotId, theirSlotId: targetSlot._id });
            onSuccess && onSuccess();
            onClose();
        } catch (e) {
            alert(e.response?.data?.error || 'Error');
        } finally { setLoading(false); }
    }

    if (!open) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: '#fff', padding: 20, width: 600, borderRadius: 8 }}>
                <h3>Request swap with: {targetSlot.title}</h3>
                <p>Choose one of your SWAPPABLE slots to offer:</p>
                {mySwappables.length === 0 && <div>No swappable slots found. Make one of your events SWAPPABLE first.</div>}
                {mySwappables.map(s => (
                    <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                        <div>{s.title} — {new Date(s.startTime).toLocaleString()}</div>
                        <button onClick={() => submit(s._id)} disabled={loading}>Offer this</button>
                    </div>
                ))}
                <div style={{ marginTop: 12 }}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
