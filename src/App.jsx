import { useState } from 'react'
import './App.css'

function App() {
  // Стейт для суми рахунку
  const [bill, setBill] = useState('');
  // Стейт для відсотка чайових
  const [tipPercentage, setTipPercentage] = useState(15);
  // Стейт для результатів розрахунку
  const [results, setResults] = useState(null);

  const calculateTip = () => {
    const billAmount = parseFloat(bill);
    // Перевірка, чи введене число є коректним
    if (isNaN(billAmount) || billAmount <= 0) {
      alert("Будь ласка, введіть коректну суму рахунку");
      setResults(null);
      return;
    }

    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;

    // Зберігаємо результати, округлені до двох знаків після коми
    setResults({
      tip: tipAmount.toFixed(2),
      total: totalAmount.toFixed(2)
    });
  };

  return (
    <div className="calculator-container">
      <h1>Калькулятор Чайових (MVP)</h1>

      <div className="input-group">
        <label>Сума рахунку (₴):</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="Наприклад, 500"
        />
      </div>

      <div className="input-group">
        <label>Відсоток чайових: {tipPercentage}%</label>
        <input
          type="range"
          min="0"
          max="30"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(e.target.value)}
        />
      </div>

      <button onClick={calculateTip} className="calc-btn">Розрахувати</button>

      {results && (
        <div className="results-area">
          <h3>Результати:</h3>
          <p>Сума чайових: <strong>{results.tip} ₴</strong></p>
          <p>Загальна сума: <strong>{results.total} ₴</strong></p>
        </div>
      )}
    </div>
  )
}

export default App