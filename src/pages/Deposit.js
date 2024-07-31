import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

function Deposit() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const { currentUser, updateUserBalance } = useContext(UserContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (currentUser) {
      setBalance(currentUser.balance);
    } else {
      setBalance(0);
    }
  }, [currentUser]);

  const handleDeposit = (event) => {
    event.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }
    const newBalance = balance + numAmount;
    updateUserBalance(currentUser.email, newBalance);
    setMessage('Deposit successful!');
    setAmount('');
    setBalance(newBalance);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Deposit</h5>
              <p>Balance: ${balance.toFixed(2)}</p>
              {message && <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
              <form onSubmit={handleDeposit}>
                <div className="form-group">
                  <label htmlFor="amount">Deposit Amount</label>
                  <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={!amount}>Deposit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
