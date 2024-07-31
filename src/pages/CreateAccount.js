import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { addUser } = useContext(UserContext);

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name cannot be blank.';
    }
    if (!email) {
      errors.email = 'Email cannot be blank.';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const success = addUser({ name, email, password, balance: 0 });
      if (success) {
        setMessage('Account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setErrors({});
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
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <div className="alert alert-danger mt-2">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className="alert alert-danger mt-2">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {errors.password && <div className="alert alert-danger mt-2">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
