import React from 'react';
import bankImage from './bank.png'; // Ensure the correct path based on your project structure

function Home() {
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">The Best Bank</h5>
          <p className="card-text">Manage your finances with ease.</p>
          <img src={bankImage} className="card-img-top mx-auto d-block" alt="Bank" style={{ maxWidth: '50%', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
