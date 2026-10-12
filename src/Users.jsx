
import { useState, useEffect } from 'react';

function Users() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem('users')) || []
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  function login(e) {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      setLoggedIn(true);
    } else {
      alert('Incorrect username or password.');
    }
  }

  function saveUser(e) {
    e.preventDefault();

    if (editId !== null) {
      setUsers(users.map(user =>
        user.id === editId
          ? { ...user, name, email, phone }
          : user
      ));
    } else {
      setUsers([...users, {
        id: Date.now(),
        name,
        email,
        phone
      }]);
    }

    clearForm();
  }

  function editUser(user) {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setEditId(user.id);
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPhone('');
    setEditId(null);
  }

  function deleteUser(id) {
    setUsers(users.filter(user => user.id !== id));
  }

  if (!loggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>

        <form className="book-form" onSubmit={login}>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>Demo username: admin</p>
        <p>Demo password: admin123</p>
      </div>
    );
  }

  return (
    <div>
      <h1>User Management</h1>

      <button onClick={() => setLoggedIn(false)}>Logout</button>

      <form className="book-form" onSubmit={saveUser}>
        <input
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />

        <button type="submit">
          {editId !== null ? 'Update Member' : 'Register Member'}
        </button>

        {editId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Registered Members ({users.length})</h2>

      {users.map(user => (
        <div className="card" key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>

          <button onClick={() => editUser(user)}>Update</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Users;