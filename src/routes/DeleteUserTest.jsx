import React, { useState } from 'react';

function DeleteUserTest() {
    const [userId, setUserId] = useState('');
    const [loadingDeleting, setLoadingDeleting] = useState(false);

    const deleteUser = async (userId) => {
        setLoadingDeleting(true);
        try {
            const response = await fetch(
                `http://127.0.0.1:9998/phat-black/us-central1/deleteUser`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                console.log("User deleted successfully", data);
                alert('User successfully deleted');
            } else {
                console.error("Failed to delete user", data);
                alert(data.error || 'Failed to delete user');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert('Failed to delete user');
        } finally {
            setLoadingDeleting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        deleteUser(userId);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Delete User</h2>
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
        </div>
    );
}

export default DeleteUserTest;
