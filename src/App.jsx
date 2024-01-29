// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch initial user data from the mock API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = () => {
    // Add a new user to the mock API
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', username: '', email: '' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleEditUser = () => {
    // Update an existing user in the mock API
    axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, editingUser)
      .then(response => {
        const updatedUsers = users.map(user => (user.id === editingUser.id ? response.data : user));
        setUsers(updatedUsers);
        setEditingUser(null);
      })
      .catch(error => console.error('Error editing user:', error));
  };

  const handleDeleteUser = (id) => {
    // Delete a user from the mock API
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEditClick = (user) => {
    // Set the user to be edited
    setEditingUser({ ...user });
  };

  const handleCancelEdit = () => {
    // Cancel editing mode
    setEditingUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      <div className='add-user'>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add</button>
      </div>

      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editingUser && editingUser.id === user.id ? (
              <>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <button onClick={handleEditUser}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{user.name}</span>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
