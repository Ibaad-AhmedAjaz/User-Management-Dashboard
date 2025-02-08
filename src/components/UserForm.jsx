import React, { useState, useEffect } from "react";
import axios from "axios";
function UserForm({ onUserAdded, onUserUpdated, editingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // When editingUser changes, update the form fields
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { id: editingUser?.id, name, email };

    if (editingUser) {
      onUserUpdated(user); // Call update function if editing
    } else {
      onUserAdded(user); // Call add function if adding
    }

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
    </form>
  );
}

export default UserForm;
