# SARAL (Resilient Aid Layer) - Disaster Management & Crowd Control System

**SARAL (Resilient Aid Layer)** is a comprehensive disaster management and crowd control platform designed for large-scale events and emergency situations, adaptable for any high-density gathering or urban emergency scenario.

The system consists of two interconnected applications:
1.  **Command Center (Admin Dashboard):** For authorities to monitor situations, manage resources, and coordinate relief efforts.
2.  **Citizen App (User Interface):** For attendees to report incidents, request help, navigate to safety, and receive alerts.

---

## 🚀 Key Features

### 🏢 Command Center (Admin)
*   **Live Situation Feed:** Real-time monitoring of environmental risks (Cyclone, Fire, River Levels).
*   **Interactive Map:** Visual tracking of active units, SOS signals, and reported incidents.
*   **Broadcast Alerts:** Send mass emergency alerts to all connected users based on disaster type and zone.
*   **Resource Logistics:** Track and dispatch essential supplies (Water, Blankets, Ambulances).
*   **Incident Log:** Centralized logging of all incoming reports (Medical, Damage, Missing Persons).
*   **Infrastructure Status:** Toggle layers for power grids, road blockages, and damage reports.

### 📱 Citizen App (User)
*   **SOS Emergency:** One-tap distress signal broadcasting location and user details.
*   **Stampede Prevention:** Intelligent routing to different safe zones to distribute crowd density.
*   **Offline Mesh Mode:** Simulation of mesh radio communication for areas with poor internet connectivity.
*   **Health Triage:** Quick reporting of medical status (Minor, Moderate, Critical).
*   **Lost & Found:** Report missing persons or lost items with photo uploads.
*   **Multi-Language Support:** Available in English, Hindi, Marathi, and Bengali.

---

## 🛠️ Technology Stack

*   **Frontend:** HTML5, JavaScript (ES6+)
*   **Styling:** Tailwind CSS (via CDN)
*   **Mapping:** Leaflet.js (OpenStreetMap & CartoDB Tiles)
*   **Routing:** OSRM (Open Source Routing Machine) API
*   **Icons:** FontAwesome
*   **Communication:** `BroadcastChannel` API (Simulates real-time WebSocket communication)

---

## 📦 Installation & Setup

Since this is a client-side prototype, no complex backend installation is required.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/pranavupadhyay123/HackForSocialCause_TeamSaral.git
    cd HackForSocialCause_TeamSaral
    ```

2.  **Run the Application:**
    *   You can simply open the HTML files in any modern web browser.
    *   **Recommended:** Use a local development server (like Live Server in VS Code) to ensure all features work correctly.

    ```bash
    # If you have Python installed:
    python3 -m http.server
    # Then open http://localhost:8000
    ```

---

## 📖 Usage Guide

To fully simulate the system, you need to open both interfaces simultaneously:

1.  **Open `index.html`** in one browser tab/window. This is the **Command Center**.
2.  **Open `User_Interface.html`** in a *separate* browser tab/window. This is the **Citizen App**.
3.  **Simulate Interactions:**
    *   **Send SOS:** Click the SOS button on the Citizen App. Watch it appear instantly on the Command Center map and log.
    *   **Broadcast Alert:** In the Command Center, select a disaster type and click "SEND ALERT". The Citizen App will show a full-screen emergency overlay.
    *   **Resource Request:** Request help in the Citizen App (Volunteer section). See the resource counters update in the Command Center.
    *   **Navigation:** Click "Navigate to Safe Zone" in the Citizen App to see the stampede prevention routing in action.

---

## 🔮 Future Roadmap

*   **Backend Integration:** Replace `BroadcastChannel` with a real WebSocket server (Node.js/Socket.io) for remote communication.
*   **Database:** Implement MongoDB/PostgreSQL for persistent data storage.
*   **Mobile App:** Wrap the Citizen App using React Native or Flutter for native mobile deployment.
*   **AI Analytics:** Integrate predictive models for crowd density and disaster forecasting.
*   **IoT Integration:** Connect with real sensors for automated environmental monitoring.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Team Saral** - *Innovating for a Safer Tomorrow*
