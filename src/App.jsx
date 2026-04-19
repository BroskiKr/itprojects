import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header';
import posthog from 'posthog-js';
import * as Sentry from "@sentry/react";

function App() {
  const [bill, setBill] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [results, setResults] = useState(null);

  const [showSplit, setShowSplit] = useState(false);

  // Ініціалізація перевірки Feature Flag
  useEffect(() => {
    Sentry.setUser({
      id: "1",
      email: "student@unidone.app",
      segment: "university_project"
    });

    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled('show-split-feature')) {
        setShowSplit(true);
      } else {
        setShowSplit(false);
      }
    });

    return () => Sentry.setUser(null);
  }, []);

  const throwError = () => {
    throw new Error("Sentry Test Error: Something went wrong in TipCalc!");
  };

  const calculateTip = () => {
    const billAmount = parseFloat(bill);

    // Відстеження помилки введення
    if (isNaN(billAmount) || billAmount <= 0) {
      posthog.capture('calculation_failed', {
        error_type: 'invalid_input',
        input_value: bill
      });

      alert("Будь ласка, введіть коректну суму рахунку");
      setResults(null);
      return;
    }

    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;

    // Відстеження успішного розрахунку
    posthog.capture('calculation_performed', {
      bill_amount: billAmount,
      tip_percentage: parseInt(tipPercentage),
      total_sum: totalAmount.toFixed(2),
      app_status: import.meta.env.VITE_APP_STATUS
    });

    setResults({
      tip: tipAmount.toFixed(2),
      total: totalAmount.toFixed(2)
    });
  };

  return (
    <div className="calculator-container">
      <Header />
      <h1>Калькулятор Чайових</h1>

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

      {/* Відображення блоку за Feature Flag */}
      {showSplit && (
        <div className="input-group" style={{
          border: '1px dashed #2c3e50',
          padding: '10px',
          borderRadius: '8px',
          marginTop: '10px',
          backgroundColor: 'rgba(44, 62, 80, 0.05)'
        }}>
          <label style={{ fontWeight: 'bold' }}>👥 Розділити на компанію?</label>
          <p style={{ fontSize: '12px', margin: '5px 0 0', color: '#666' }}>
            {"Ця функція з'явилася завдяки Feature Flag!"}
          </p>
        </div>
      )}

      <button onClick={calculateTip} className="calc-btn">Розрахувати</button>

      {results && (
        <div className="results-area">
          <h3>Результати:</h3>
          <p>Сума чайових: <strong>{results.tip} ₴</strong></p>
          <p>Загальна сума: <strong>{results.total} ₴</strong></p>
        </div>
      )}
      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <button
          onClick={throwError}
          style={{
            backgroundColor: '#ff4d4d',
            color: 'white',
            fontSize: '11px',
            padding: '5px 10px',
            opacity: 0.7,
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ⚠️ Break the world (Test Sentry)
        </button>
      </div>
    </div>
  )
}

export default App