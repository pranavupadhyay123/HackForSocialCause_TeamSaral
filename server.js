const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load SSL Certificates
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, app);
const io = require('socket.io')(server);

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for Control Room (Admin)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for User Interface (Citizen App)
app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'User_Interface.html'));
});

// Store connected users
let connectedUsers = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Identify client type (optional, but good for debugging)
    socket.on('identify', (data) => {
        console.log('Client identified:', data);
        if (data.type === 'USER') {
            connectedUsers[socket.id] = data;
            // Broadcast new count
            io.emit('ACTIVE_USERS_COUNT', Object.keys(connectedUsers).length);
        }
    });

    // Handle Location Updates from User
    socket.on('LOCATION_UPDATE', (data) => {
        // Broadcast to all clients (specifically Control Room will listen)
        io.emit('LOCATION_UPDATE', data);
    });

    // Handle SOS Signals from User
    socket.on('SOS', (data) => {
        console.log('SOS RECEIVED:', data);
        io.emit('SOS', data);
    });

    // Handle Triage/Medical Reports
    socket.on('TRIAGE_REPORT', (data) => {
        io.emit('TRIAGE_REPORT', data);
    });

    socket.on('MEDICAL_REPORT', (data) => {
        console.log('MEDICAL REPORT:', data);
        io.emit('MEDICAL_REPORT', data);
    });

    // Handle Resource Updates
    socket.on('RESOURCE_UPDATE', (data) => {
        io.emit('RESOURCE_UPDATE', data);
    });

    // Handle Disaster Alerts from Control Room
    socket.on('DISASTER_ALERT', (data) => {
        console.log('DISASTER ALERT BROADCAST:', data);
        io.emit('DISASTER_ALERT', data);
    });

    // Handle Help Requests
    socket.on('HELP_REQUEST', (data) => {
        io.emit('HELP_REQUEST', data);
    });

    // Handle Volunteer Joins
    socket.on('VOLUNTEER_JOIN', (data) => {
        io.emit('VOLUNTEER_JOIN', data);
    });

    // Handle Found Person Reports
    socket.on('FOUND_PERSON', (data) => {
        io.emit('FOUND_PERSON', data);
    });

    // Handle Missing Person Sync
    socket.on('MISSING_PERSON', (data) => {
        io.emit('MISSING_PERSON', data);
    });

    // Handle SOS Acknowledgement (Control Room -> User)
    socket.on('SOS_ACKNOWLEDGE', (data) => {
        console.log('SOS ACKNOWLEDGED:', data.userId);
        io.emit('SOS_ACKNOWLEDGE', data); // Broadcast to all (User will listen for their ID)
    });

    // Handle SOS Resolution
    socket.on('SOS_RESOLVE', (data) => {
        console.log('SOS RESOLVED:', data.userId);
        io.emit('SOS_RESOLVE', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        if (connectedUsers[socket.id]) {
            delete connectedUsers[socket.id];
            // Broadcast new count
            io.emit('ACTIVE_USERS_COUNT', Object.keys(connectedUsers).length);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => { // Listen on 0.0.0.0 to accessible from network
    console.log(`Server running on https://0.0.0.0:${PORT}`);
});

// --- REAL-TIME DATA FETCHING ---
const axios = require('axios');
const API_KEY = '427b095f5b1efd5d706bb36999355fb1'; // OpenWeatherMap Key

// Locations to monitor (Example: Odisha for Cyclone, Varanasi for River)
const LOC_CYCLONE = { lat: 20.2961, lon: 85.8245 }; // Bhubaneswar
const LOC_RIVER = { lat: 25.3176, lon: 82.9739 };   // Varanasi (Ganges)

async function fetchDisasterData() {
    try {
        console.log("Fetching live disaster data...");

        // 1. Weather & Cyclone (OpenWeatherMap)
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LOC_CYCLONE.lat}&lon=${LOC_CYCLONE.lon}&units=metric&appid=${API_KEY}`;
        const weatherRes = await axios.get(weatherUrl);
        const w = weatherRes.data;

        // Custom Logic for 'Cyclone' based on wind speed (simplistic) or Alerts if available
        // Note: Standard API doesn't always have 'alerts' free, so we infer risk.
        let cycloneDetails = "Normal";
        if (w.wind.speed > 60) cycloneDetails = `SEVERE (${w.wind.speed}km/h)`;
        else if (w.wind.speed > 30) cycloneDetails = `High Wind (${w.wind.speed}km/h)`;
        else cycloneDetails = `Calm (${w.wind.speed}km/h)`;

        // Fire Risk Calculation
        // High Temp (>35C) + Low Humidity (<30%) + Wind (>15km/h)
        let fireRisk = "Low";
        if (w.main.temp > 30 && w.main.humidity < 40 && w.wind.speed > 10) fireRisk = "Moderate";
        if (w.main.temp > 35 && w.main.humidity < 30 && w.wind.speed > 15) fireRisk = "EXTREME";
        const fireDetails = `${fireRisk} (${w.main.temp}°C, ${w.main.humidity}%)`;

        // 2. River Level (Open-Meteo Flood API)
        // Using global flood API for discharge
        const floodUrl = `https://flood-api.open-meteo.com/v1/flood?latitude=${LOC_RIVER.lat}&longitude=${LOC_RIVER.lon}&daily=river_discharge&forecast_days=1`;
        const floodRes = await axios.get(floodUrl);
        const discharge = floodRes.data.daily.river_discharge[0]; // m3/s

        // Mocking 'Level' from discharge for demo (Discharge > 1000 = High)
        let riverStatus = `Normal (${discharge} m³/s)`;
        if (discharge > 5000) riverStatus = `DANGER (${discharge} m³/s)`;
        else if (discharge > 2000) riverStatus = `Rising (${discharge} m³/s)`;

        const feedData = {
            cyclone: cycloneDetails,
            river: riverStatus,
            fire: fireDetails,
            location: w.name,
            timestamp: new Date().toLocaleTimeString()
        };

        // Broadcast to all clients
        io.emit('DISASTER_FEED_UPDATE', feedData);

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// Fetch every 10 seconds (for demo purposes, usually slower in prod)
setInterval(fetchDisasterData, 10000);
// Fetch immediately on start
fetchDisasterData();
