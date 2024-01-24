import React, { useState, useEffect } from 'react';
import '../UsersTable.css'; // Import custom CSS file for styling

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend API
    fetch('http://127.0.0.1:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  console.log(users);
  return (
    <div className="users-table-container">
      <h2 className="table-title">All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>IsVerified</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.isverified}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
