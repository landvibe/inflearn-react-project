import React from 'react';

export default function Header() {
  return (
    <header className="heading">
      <h1 className="title">2048</h1>
      <div className="scores-container">
        <div className="score-container" style={{ marginRight: 5 }}>
          0
        </div>
        <div className="best-container">2480</div>
      </div>
    </header>
  );
}
