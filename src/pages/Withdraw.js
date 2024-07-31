import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

function Withdraw() {
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

  const handleWithdraw = (event) => {
    event.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }
    if (numAmount > balance) {
      setMessage('Insufficient funds.');
      return;
    }
    const newBalance = balance - numAmount;
    updateUserBalance(currentUser.email, newBalance);
    setMessage('Withdrawal successful!');
    setAmount('');
    setBalance(newBalance);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Withdraw</h5>
              <p>Balance: ${balance.toFixed(2)}</p>
              {message && <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
              <form onSubmit={handleWithdraw}>
                <div className="form-group">
                  <label htmlFor="amount">Withdraw Amount</label>
                  <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={!amount}>Withdraw</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
