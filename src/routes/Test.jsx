import React, { useState } from 'react';
import axios from 'axios';
//import { deleteUser } from 'firebase/auth';

function deleteAccounts() {
    const [userId, setUserId] = useState('');
    const [loadingDeleting, setLoadingDeleting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await deleteUser(userId);
    };

    const deleteUser = async (userId) => {
        setLoadingDeleting(true);
        try {
            const response = await axios.delete(`http://127.0.0.1:9998/phat-black/us-central1/deleteUser`, {
                data: { userId },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("User deleted successfully", response.data);
            alert('User successfully deleted');
        } catch (error) {
            console.error("Error deleting user:", error);
            alert(error.response.data.error || 'Failed to delete user');
        } finally {
            setLoadingDeleting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID to delete"
                disabled={loadingDeleting}
            />
            <button type="submit" disabled={loadingDeleting || !userId}>
                {loadingDeleting ? 'Deleting...' : 'Delete User'}
            </button>
        </form>
    );
}

export default deleteAccounts;
