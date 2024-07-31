import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function AllData() {
  const { users, updateUser, deleteUser } = useContext(UserContext);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedBalance, setEditedBalance] = useState('');

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedPassword(user.password);
    setEditedBalance(user.balance);
  };

  const handleSaveEdit = () => {
    updateUser(editingUser.email, {
      name: editedName,
      email: editedEmail,
      password: editedPassword,
      balance: parseFloat(editedBalance),
    });
    setEditingUser(null);
  };

  const handleDeleteClick = (email) => {
    deleteUser(email);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">All Data</h5>
          {users.length === 0 ? (
            <p>No user data available.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>${user.balance.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(user)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(user.email)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {editingUser && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="close" onClick={() => setEditingUser(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={editedPassword}
                      onChange={(e) => setEditedPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      id="balance"
                      value={editedBalance}
                      onChange={(e) => setEditedBalance(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllData;
