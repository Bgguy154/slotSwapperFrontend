// frontend/src/pages/Marketplace.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import EventCard from '../components/EventCard';
import SwapModal from '../components/SwapModal';

export default function Marketplace() {
    const [slots, setSlots] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [target, setTarget] = useState(null);

    async function load() {
        const res = await api.get('/swappable-slots');
        setSlots(res.data);
    }

    useEffect(() => { load(); }, []);

    function openModal(slot) { setTarget(slot); setModalOpen(true); }
    function closeModal() { setModalOpen(false); setTarget(null); }

    return (
        <div style={{ padding: 20 }}>
            <h2>Marketplace — Swappable Slots</h2>
            {slots.map(s => (
                <div key={s._id} style={{ marginBottom: 8 }}>
                    <EventCard ev={s} onRequestSwap={() => openModal(s)} />
                </div>
            ))}

            <SwapModal open={modalOpen} onClose={closeModal} targetSlot={target} onSuccess={load} />
        </div>
    );
}
