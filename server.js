const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (in-memory storage for demonstration)
const simCards = {};

// Endpoint to activate a SIM
app.post('/activate', (req, res) => {
    const { simNumber } = req.body;

    if (simCards[simNumber]) {
        return res.status(400).json({ error: 'SIM already activated' });
    }

    simCards[simNumber] = {
        phone_number: `+123456789${Object.keys(simCards).length + 1}`, // Example phone number
        status: 'active',
        activation_date: new Date().toISOString(),
    };

    res.json({ message: 'SIM activated successfully' });
});

// Endpoint to deactivate a SIM
app.post('/deactivate', (req, res) => {
    const { simNumber } = req.body;

    if (!simCards[simNumber]) {
        return res.status(404).json({ error: 'SIM not found' });
    }

    delete simCards[simNumber];
    res.json({ message: 'SIM deactivated successfully' });
});

// Endpoint to get SIM details
app.get('/sim-details/:simNumber', (req, res) => {
    const { simNumber } = req.params;

    const simDetails = simCards[simNumber];
    if (!simDetails) {
        return res.status(404).json({ error: 'SIM not found' });
    }

    res.json({ sim_number: simNumber, ...simDetails });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
