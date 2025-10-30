// frontend/src/components/EventCard.jsx
import React from 'react';

export default function EventCard({ ev, onToggleSwappable, onRequestSwap }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6, marginBottom: 8 }}>
            <h4>{ev.title}</h4>
            <div>{new Date(ev.startTime).toLocaleString()} - {new Date(ev.endTime).toLocaleString()}</div>
            <div>Status: {ev.status}</div>
            {onToggleSwappable && (
                <button onClick={() => onToggleSwappable(ev)} style={{ marginTop: 8 }}>
                    {ev.status === 'SWAPPABLE' ? 'Make Busy' : 'Make Swappable'}
                </button>
            )}
            {onRequestSwap && (
                <button onClick={() => onRequestSwap(ev)} style={{ marginLeft: 8 }}>Request Swap</button>
            )}
        </div>
    );
}
