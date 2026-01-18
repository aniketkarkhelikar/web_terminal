const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');

const app = express();

// --- SECURITY WARNING ---
// Change these credentials for any real-world use!
app.use(basicAuth({
    users: { 'admin': 'password123' },
    challenge: true,
    realm: 'Web Terminal Login'
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000; // Use a different port like 8000
app.listen(PORT, () => {
    console.log(`Master Web UI Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});
