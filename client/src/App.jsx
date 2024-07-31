import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignUpForm } from './components/signupform/SignUpForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/MatthewLabasan/arl-project" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>scibyte</h1>
      <h2>Stay Informed with Tailored Research Updates</h2>
      <p>Looking to stay up to date on a specific topic? Simply enter your topic of interest, and receive curated weekly emails featuring the latest news, research articles, and updates. Never miss out on key developments and keep your knowledge fresh with scibyte! </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
