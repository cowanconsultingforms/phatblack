import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/UsersList.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [authorization, setAuthorization] = useState(false);
  const [filterRole, setFilterRole] = useState('all');
  const [sortField, setSortField] = useState('email');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const getUserRole = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && ['admin', 'viewer', 'owner'].includes(userDoc.data().role)) {
            setUserRole(userDoc.data().role);
            setAuthorization(true);
            fetchUsers();
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

  useEffect(() => {
    const filtered = users
      .filter(user => filterRole === 'all' || user.role === filterRole)
      .sort((a, b) => {
        if (sortField === 'email' || sortField === 'username') {
          const valueA = a[sortField].toLowerCase();
          const valueB = b[sortField].toLowerCase();

          if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
          if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
          return 0; // values are equal
        }
        return 0;
      });

    setFilteredUsers(filtered);
  }, [users, filterRole, sortField, sortOrder]);

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
    return <div className="users-list-title">Unauthorized Access</div>;
  }

  return (
    <div className="users-list-container">
      <h1 className="users-list-title">Users List</h1>
      <div className="filters">
        <select onChange={(e) => setFilterRole(e.target.value)} className="filter-dropdown">
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
        <select onChange={(e) => setSortField(e.target.value)} className="filter-dropdown">
          <option value="email">Email</option>
          <option value="username">Username</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="filter-dropdown">
          Sort: {sortOrder.toUpperCase()}
        </button>
      </div>
      <br />
      <div className="users-list-table-wrapper">
        <table className="users-list-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>UID</th>
              <th>Username</th>
              <th>Role</th>
              {(userRole === 'admin' || userRole === 'owner') && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.uid}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                {(userRole === 'admin' || userRole === 'owner') && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UsersList;
