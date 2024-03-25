import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaTrash, FaPen } from 'react-icons/fa';
import '../Styles/UsersList.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [sortField, setSortField] = useState('email');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate('/');

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!['admin', 'staff', 'super admin'].includes(userDoc.data()?.role)) {
        navigate('/');
        return;
      }
      fetchUsers();
    });


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
          return 0;
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

  async function handleDeleteUser(userId) {
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
        fetchUsers();
      } else {
        console.error("Failed to delete user", data);
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('Failed to delete user');
    } finally {
      //
    }
  }

  const handleDeleteClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      handleDeleteUser(userId);
    }
  };

  return (
    <div className="users-list-container">
      <h1 className="users-list-title">Users List</h1>
      <div className="filters">
        <select onChange={(e) => setFilterRole(e.target.value)} className="filter-dropdown">
          <option value="all">All Users</option>
          <option value="user">User</option>
          <option value="premium_user">Premium User</option>
          <option value="partner">Partner</option>
          <option value="client">Client</option>
          <option value="vendor">Vendor</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
          <option value="super admin">Super Admin</option>
        </select>
        <select onChange={(e) => setSortField(e.target.value)} className="filter-dropdown">
          <option value="email">Email</option>
          <option value="username">Username</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-button">
          Sort: {sortOrder.toUpperCase()}
        </button>
      </div>
      <div className="users-list-table-wrapper">
        <table className="users-list-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td className="action-buttons">

                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="role-dropdown"
                  >
                    <option value="user">User</option>
                    <option value="premium_user">Premium User</option>
                    <option value="partner">Partner</option>
                    <option value="client">Client</option>
                    <option value="vendor">Vendor</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="super admin">Super Admin</option>

                  </select>
                  <button onClick={() => handleDeleteClick(user.id)} className="delete-button">
                    <FaTrash />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
export default UsersList;
