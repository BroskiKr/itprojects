import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'

// Ініціалізація PostHog
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: 'identified_only', // Створювати профілі тільки для ідентифікованих
  capture_pageview: true,             // Автоматично відстежувати перегляд сторінок
  autocapture: true                   // Відстежувати кліки на кнопки та введення в форми
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
