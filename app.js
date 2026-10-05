// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

document.getElementById('billForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    
    // UI Feedback
    submitBtn.disabled = true;
    submitBtn.innerText = 'Saving...';
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';

    const data = {
        customerName: document.getElementById('customerName').value,
        roomNumber: document.getElementById('roomNumber').value,
        item: document.getElementById('item').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('price').value,
        workerName: document.getElementById('workerName').value
    };

    try {
        // We use text/plain to avoid CORS preflight issues with Google Apps Script
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Apps Script if not using proper CORS headers
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(data)
        });

        // Because of 'no-cors', we can't read the response JSON directly. 
        // We assume success if no network error occurred.
        messageDiv.innerText = '✅ Bill saved successfully!';
        messageDiv.className = 'message success';
        document.getElementById('billForm').reset();
        
    } catch (error) {
        messageDiv.innerText = '❌ Error saving bill. Please try again.';
        messageDiv.className = 'message error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Save Bill';
    }
});