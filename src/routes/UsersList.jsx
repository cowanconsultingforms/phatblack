import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/UsersList.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [authorization, setAuthorization] = useState(false)
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const getUserRole = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && (userDoc.data().role == "admin" || userDoc.data().role == "viewer" || userDoc.data().role == "owner")) {
            fetchUsers();
            setUserRole(userDoc.data().role);
            setAuthorization(true);
          }
        } else {
          navigate('/');
        }
      });
    };

    getUserRole();
  }, [navigate, auth]);

  const fetchUsers = async () => {
    const usersCollectionRef = collection(db, 'users');
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateUserRole = async (userId, newRole) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { role: newRole });
    fetchUsers();
  };

  if (!authorization) {
    return <div className="users-list-title">
      Unauthorized Access
    </div>
  }

  return (
    <div className="users-list-container">
      <h1 className="users-list-title">Users List</h1>
      <div className="users-list-table-wrapper">
        <table className="users-list-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>UID</th>
              <th>Username</th>
              <th>Role</th>
              {(userRole == "owner" || userRole == "admin") && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.uid}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                {(userRole == "owner" || userRole == "admin") &&
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="role-dropdown"
                    >
                      <option value="user">User</option>
                      <option value="viewer">Viewer</option>
                      <option value="admin">Admin</option>
                      <option value="owner">Owner</option>
                    </select>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;