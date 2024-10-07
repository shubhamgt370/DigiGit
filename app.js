const backendUrl = 'http://localhost:3000';

// Handle the Activate/Deactivate SIM form submission
document.getElementById('simForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const simNumber = document.getElementById('simNumber').value;
    const action = document.getElementById('action').value;
    const endpoint = action === 'activate' ? '/activate' : '/deactivate';

    try {
        const response = await fetch(`${backendUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ simNumber })
        });

        const result = await response.json();
        document.getElementById('output').textContent = result.message || result.error;
    } catch (error) {
        document.getElementById('output').textContent = 'Error: ' + error.message;
    }
});

document.getElementById('getDetailsForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const simNumberDetails = document.getElementById('simNumberDetails').value;

    try {
        const response = await fetch(`${backendUrl}/sim-details/${simNumberDetails}`);
        const result = await response.json();

        if (response.ok) {
            document.getElementById('output').textContent = `SIM Number: ${result.sim_number}, Phone Number: ${result.phone_number}, Status: ${result.status}, Activation Date: ${result.activation_date}`;
        } else {
            document.getElementById('output').textContent = result.error;
        }
    } catch (error) {
        document.getElementById('output').textContent = 'Error: ' + error.message;
    }
});
