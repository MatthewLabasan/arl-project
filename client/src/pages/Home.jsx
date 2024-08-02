import { useState } from 'react'
import logo from '/logo.png'
import '../components/signupform/SignUpForm.jsx'
import SignUpForm from '../components/signupform/SignUpForm.jsx'
import './Home.css'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='home'>
        <a href="https://github.com/MatthewLabasan/arl-project" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
        <h1>scibyte</h1>
        <h2>Stay Informed with Tailored Research Updates</h2>
        <p>Looking to stay up to date on a specific topic? Simply enter your topic of interest, and receive curated weekly emails featuring the latest news, research articles, and updates. Never miss out on key developments and keep your knowledge fresh with scibyte! </p>
        <SignUpForm></SignUpForm>
        <a href="https://github.com/MatthewLabasan/arl-project" className="read-the-docs">
          See source code here!
        </a>
      </section>
    </>
  )
}

export default Home
