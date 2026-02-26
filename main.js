const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Helper to generate a random code
const generateCode = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

app.post('/requestcode', (req, res) => {
    console.log('Received code request:', req.body);
    const { ip, port } = req.body;

    // Basic validation to ensure data was sent
    if (!ip || !port) {
        return res.status(400).json({ error: 'Please provide both ip and port.' });
    }

    const randomCode = generateCode();

    console.log(`Code requested for ${ip}:${port}`);

    // Respond with the code
    res.json({
        success: true,
        code: randomCode
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});