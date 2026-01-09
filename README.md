# Saral: Smart Alert and Resilient Aid Layer

**SARAL** is a disaster management platform connecting a central **Command Center** with a **Citizen App** for real-time coordination during emergencies.

## 🚀 Key Features

*   **Real-Time Dashboard**: Live tracking of SOS signals, incidents, and resources on an interactive map.
*   **Offline Mesh Mode**: Simulates mesh networking to relay SOS messages without internet.
*   **Voice Guard SOS**: Hands-free SOS activation by saying **"Help Help Help"** (5s countdown).
*   **Face Matching**: Upload missing person photos to find matches using on-device AI (`face-api.js`).
*   **SMS Fallback**: Generates emergency SMS text when data connection fails.
*   **Stampede Prevention**: Intelligent routing to safe zones.

## 🛠️ Usage

This project uses a **Node.js + Socket.IO** server for real-time communication.

### 1. Setup
```bash
git clone https://github.com/pranavupadhyay123/HackForSocialCause_TeamSaral.git
cd HackForSocialCause_TeamSaral
npm install
```

### 2. Run
```bash
npm start
```
*   Server starts on `https://0.0.0.0:3000` (Self-signed HTTPS required for Camera/Mic).
*   **Accept the security warning** in your browser (Advanced -> Proceed).

### 3. Open Interfaces
*   **Command Center**: [https://localhost:3000](https://localhost:3000)
*   **Citizen App**: [https://localhost:3000/user](https://localhost:3000/user)

## 🏗️ Tech Stack
*   **Frontend**: HTML5, Tailwind CSS, Leaflet.js, Face-API.js
*   **Backend**: Node.js, Express, Socket.IO
*   **Protocol**: HTTPS (Local), Simulated Mesh Radio (868MHz logic)

---
**Team Saral** - *Innovating for Safety*
