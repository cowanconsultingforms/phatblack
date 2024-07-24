import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AdminMenu from './AdminMenu'; // Import admin sub-menu component
import AddGamePanel from './AddGamePanel'; // Import new component for adding games

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddGamePanelOpen, setIsAddGamePanelOpen] = useState(false); 
  //Initial state is false
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        }
      }
    });
  }, [auth]);

  const handleOpenAddGamePanel = () => {
    setIsAddGamePanelOpen(!isAddGamePanelOpen); // Toggle panel visibility
  };

  return (
    <div>
      {/* Rest of your application components */}
      {isAdmin && (
        <>
          <AdminMenu /> {/* Render admin sub-menu if user is admin */}
          <button onClick={handleOpenAddGamePanel}>
            {isAddGamePanelOpen ? 'Close Add Game Panel' : 'Add Pre-Made Game'}
          </button>
          {isAddGamePanelOpen && <AddGamePanel onClose={handleOpenAddGamePanel} />} {/* Render AddGamePanel conditionally */}
        </>
      )}
    </div>
  );
};

export default App;