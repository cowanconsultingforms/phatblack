import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';



function TestCalls() {
    const [userId, setUserId] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [access, setAccess] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const testUrl = import.meta.env.VITE_APP_TEST_URL;
    const deleteUserUrl = import.meta.env.VITE_APP_DELETE_USER_URL;

    useEffect(() => {
        const getUserRole = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists() && ['admin', 'staff', 'super admin'].includes(userDoc.data().role)) {
                        setAccess(true);
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            });
        };

        getUserRole();

    }, [navigate, auth]);

    if (access) {
        async function handleDeleteUser(userId) {
            setLoading(true);
            try {
                const response = await fetch(
                    deleteUserUrl,
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
                setLoading(false);
            }
        }

        async function handleGenerateContent(query) {
            setLoading(true);
            try {
                const response = await fetch(
                    `${testUrl}/generateContent`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                console.log("Content generated successfully", data);
                alert('Content generated successfully');

                setOutput(data.response.candidates[0].content.parts[0].text);

            } catch (error) {
                console.error("Error generating content:", error);
                alert('Failed to generate content');
            } finally {
                setLoading(false);
            }
        }

        const handleDeleteUserSubmit = async (e) => {
            e.preventDefault();
            if (userId) await handleDeleteUser(userId);
        };

        const handleGenerateContentSubmit = async (e) => {
            e.preventDefault();
            if (query) await handleGenerateContent(query);
        };

        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Delete User</h2>
                <form onSubmit={handleDeleteUserSubmit}>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter user ID to delete"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Submit'}
                    </button>
                <h2>Generate Content</h2>
                </form>
                <form onSubmit={handleGenerateContentSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter query for content generation"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Submit'}
                    </button>
                    </form>
                <br />
                <h1>{output}</h1>
            </div>
        );
    }
}


export default TestCalls;
