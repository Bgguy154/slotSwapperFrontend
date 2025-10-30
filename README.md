# 🎨 SlotSwapper Frontend (React)

SlotSwapper is a peer-to-peer time-slot swapping app.  
This frontend provides a clean, playful, and interactive UI for browsing, requesting, and managing slot swaps.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | React (Vite) |
| State Management | Context API |
| Routing | React Router |
| HTTP Client | Axios |
| Styling | Custom CSS (Playful theme) |
| Auth | JWT stored in localStorage |
| Deployment | Vercel |

---

## ✨ UI Theme – *Playful Colorful UI*

This project uses a **fresh & friendly playful theme** with:

- Rounded UI components
- Soft gradients
- Bright accent colors
- Smooth hover animations
- Minimalistic layout with focus on usability

This theme is selected to create a fun and friendly swapping experience rather than a formal enterprise dashboard.

---

# 🔐 Authentication Flow

- User logs in → receives JWT token
- Token saved in **localStorage**
- Axios interceptors attach token to every request
- Protected routes auto-redirect unauthenticated users to Login

---

## 🧠 Core Pages & Logic

### 1️⃣ Dashboard – My Slots

- Shows your own events
- Create, edit, delete events
- Mark event as **SWAPPABLE**
- Once a request is created, status turns to **SWAP_PENDING**

### 2️⃣ Marketplace – Available Slots

- Fetches all swappable slots from **other users**
- "Request Swap" button opens modal to choose one of your swappable slots to offer

### 3️⃣ Requests

Shows two sections:

| Section | Shows |
|----------|--------|
| Incoming Requests | Other users’ offers → Accept/Reject |
| Outgoing Requests | You requested → Pending/Accepted/Rejected |

Accepting a swap triggers:

- Slot ownership swap
- Status reset to BUSY
- Page state updates instantly

---

## 📡 API Service Layer

All API calls remain in `/services/*.js` so UI components stay clean.

Example: `eventService.js`

```js
export const getMyEvents = () => api.get("/events");
