import React from 'react';

function Header() {
  return (
    <header style={{
      padding: '20px',
      backgroundColor: '#2c3e50',
      color: 'white',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h2 style={{ margin: 0 }}>💰 TipCalc Service</h2>
      <p style={{ margin: '5px 0 0', opacity: 0.8 }}>Швидкий розрахунок ваших чайових</  p>
    </header>
  );
}

export default Header;