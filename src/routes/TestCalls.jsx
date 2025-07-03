import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';



function TestCalls() {
    const [userId, setUserId] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [access, setAccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const [collections, setCollections] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();

    const testUrl = import.meta.env.VITE_APP_TEST_URL;
    const deleteUserUrl = import.meta.env.VITE_APP_DELETE_USER_URL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("TestCalls - Auth state changed - User:", user);
            if (user) {
                console.log("TestCalls - User UID:", user.uid);
                setUserId(user.uid);
                
                // Check in the main users collection
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                console.log("TestCalls - User document exists in 'users':", userDoc.exists());
                
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    console.log("TestCalls - User data from 'users':", data);
                    setUserData(data);
                    if (['admin', 'staff', 'super admin'].includes(data.role)) {
                        setAccess(true);
                    } else {
                        navigate('/');
                    }
                } else {
                    console.log("TestCalls - User document not found in 'users' collection");
                    // Let's explore other collections
                    await exploreCollections();
                }
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate, auth]);

    const exploreCollections = async () => {
        try {
            console.log("TestCalls - Exploring collections...");
            // This is a simplified approach - in a real app you'd need to list collections differently
            const collectionsToCheck = ['users', 'user', 'admin', 'admins', 'userData', 'userdata'];
            
            for (const collectionName of collectionsToCheck) {
                try {
                    const collectionRef = collection(db, collectionName);
                    const snapshot = await getDocs(collectionRef);
                    console.log(`TestCalls - Collection '${collectionName}' has ${snapshot.docs.length} documents`);
                    
                    // Check if any document has the current user's UID or email
                    snapshot.docs.forEach(doc => {
                        const data = doc.data();
                        console.log(`TestCalls - Document ${doc.id} in '${collectionName}':`, data);
                        
                        // Check by UID, email, or if the document ID matches the UID
                        if (data.uid === userId || 
                            data.email === auth.currentUser?.email || 
                            doc.id === userId ||
                            data.userId === userId) {
                            console.log(`TestCalls - Found user data in '${collectionName}' collection:`, data);
                            setUserData(data);
                            if (['admin', 'staff', 'super admin'].includes(data.role)) {
                                setAccess(true);
                            }
                        }
                    });
                } catch (error) {
                    console.log(`TestCalls - Collection '${collectionName}' does not exist or is not accessible:`, error.message);
                }
            }
        } catch (error) {
            console.error("TestCalls - Error exploring collections:", error);
        }
    };

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
                <h2>Debug Information</h2>
                <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <h3>Current User Information:</h3>
                    <p><strong>User UID:</strong> {userId}</p>
                    <p><strong>User Email:</strong> {auth.currentUser?.email}</p>
                    <p><strong>User Data:</strong></p>
                    <pre style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                        {userData ? JSON.stringify(userData, null, 2) : 'No user data found'}
                    </pre>
                    <p><strong>Access Status:</strong> {access ? 'Granted' : 'Denied'}</p>
                </div>
                
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
                </form>
                
                <h2>Generate Content</h2>
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
