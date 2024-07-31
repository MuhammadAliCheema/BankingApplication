import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { addUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password.length >= 8) {
      const success = addUser({ name, email, password, balance: 0 });
      if (success) {
        setMessage('Account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('An account with this email already exists.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Account</h5>
              {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8" />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={!name || !email || password.length < 8}>Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
