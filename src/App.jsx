import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);
  const handleAddUser = (newUser) => {
    axios.post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(response => {
        setUsers([...users, response.data]);
      })
      .catch(error => setError("Error adding user"));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      .then(() => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null); // Reset form after saving
      })
      .catch(error => setError("Error updating user"));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // Remove deleted user
      })
      .catch(error => setError("Error deleting user"));
  };


  return (
    <div>
      <h1>User Management Dashboard</h1>
      
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* Show error message if any */}

      {/* User Form (for adding or editing users) */}
      <UserForm onUserAdded={handleAddUser} onUserUpdated={handleSaveUser} editingUser={editingUser} />

      {/* User List (with edit & delete functionality) */}
      <UserList users={users} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
    </div>
  );
}

export default App;
