// SendMessage.js
import React, { useState } from 'react';
import axios from 'axios';

function SendMessage() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Replace YOUR_CLOUD_FUNCTION_URL with your actual Cloud Function URL
            const response = await axios.post('http://127.0.0.1:9998/phat-black/us-central1/receiveMessage', { message });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message"
            />
            <button type="submit">Send Message</button>
        </form>
    );
}

export default SendMessage;
