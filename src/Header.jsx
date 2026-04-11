function Header() {
  const appStatus = import.meta.env.VITE_APP_STATUS || 'Status Unknown';

  return (
    <header style={{
      padding: '20px',
      backgroundColor: '#2c3e50', // Темно-синій фон
      color: 'white',
      borderRadius: '8px',
      marginBottom: '20px',
      // Додаємо relative для позиціонування статусу
      position: 'relative',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' // Легка тінь для об'єму
    }}>
      <h2 style={{ margin: 0, fontSize: '24px' }}>💰 TipCalc Service</h2>
      <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '14px' }}>
        Швидкий розрахунок ваших чайових
      </p>

      {/* Індикатор статусу оточення (Development/Production) */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#ecf0f1', // Світло-сірий текст
        background: 'rgba(255,255,255,0.15)', // Напівпрозорий фон
        padding: '3px 8px',
        borderRadius: '4px',
        letterSpacing: '0.5px'
      }}>
        {appStatus}
      </div>
    </header>
  );
}

export default Header;