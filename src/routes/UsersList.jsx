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

  const rolePriority = {
    'super admin': 1,
    'admin': 2,
    'staff': 3,
    'vendor': 4,
    'client': 5,
    'partner': 6,
    'premium_user': 7,
    'user': 8
  };

  useEffect(() => {
    const sortedUsers = users.sort((a, b) => {
      const roleCompare = (rolePriority[a.role] || Infinity) - (rolePriority[b.role] || Infinity);
      if (roleCompare !== 0) {
        return roleCompare;
      }

      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();
      return (sortOrder === 'asc' ? 1 : -1) * (valueA.localeCompare(valueB));
    });

    const filtered = filterRole === 'all' ? sortedUsers : sortedUsers.filter(user => user.role === filterRole);

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

  async function handleDeleteUser(userId, userRole) {
    if (userRole === 'super admin') {
      alert("Cannot perform operations on Super Admin users.");
      return;
    }

    try {
      const response = await fetch(
        `https://us-central1-phat-black.cloudfunctions.net/deleteUser`,
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
        <label htmlFor="filterRole" className="filter-label">Filter by Role:</label>
        <select id="filterRole" onChange={(e) => setFilterRole(e.target.value)} className="filter-dropdown">

          <option value="all">All Users</option>
          <option value="super admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="vendor">Vendor</option>
          <option value="client">Client</option>
          <option value="partner">Partner</option>
          <option value="premium_user">Premium User</option>
          <option value="user">User</option>

        </select>

        <label htmlFor="sortField" className="filter-label">Sort By:</label>
        <select id="sortField" onChange={(e) => setSortField(e.target.value)} className="filter-dropdown">
          <option value="email">Email</option>
          <option value="username">Username</option>
        </select>

        <label htmlFor="sortOrder" className="filter-label">Order (Alphabetical):</label>
        <select id="sortOrder" onChange={(e) => setSortOrder(e.target.value)} className="filter-dropdown">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="users-list-table-wrapper">
        <table className="users-list-table">
          <thead>
            <tr>
              <th>Actions</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>

            {filteredUsers.map((user) => (
              <tr key={user.id}>

                <td className="action-buttons">
                  {user.role === "super admin" ? (
                    <h3> CANNOT BE MODIFIED </h3>
                  ) : (
                    <>
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className="role-dropdown"
                      >

                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="vendor">Vendor</option>
                        <option value="client">Client</option>
                        <option value="partner">Partner</option>
                        <option value="premium_user">Premium User</option>
                        <option value="user">User</option>

                      </select>
                      <button onClick={() => handleDeleteClick(user.id)} className="delete-button">
                        <FaTrash />
                        Delete
                      </button>
                    </>
                  )}
                </td>

                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UsersList;
