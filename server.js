require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Files (Critical for Render)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// API Endpoints (Verified)
app.get('/api/products', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'src/data/products.json'), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// Handle all other routes (SPA Fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  ┌──────────────────────────────────────────────────┐
  │                                                  │
  │   Server running on port ${PORT}                    │
  │                                                  │
  │   - Local:  http://localhost:${PORT}                │
  │   - Network: http://${getIPAddress()}:${PORT}       │
  │                                                  │
  └──────────────────────────────────────────────────┘
  `);
});

// Helper function to get IP (for local testing)
function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}