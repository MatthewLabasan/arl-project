import { useState } from 'react'
import logo from '/logo.png'
import UnsubButton from '../components/buttons/UnsubButton.jsx'
import './Home.css'

const Unsubscribe = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='home'>
        <a href="https://github.com/MatthewLabasan/arl-project" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
        <h1>We're sad to see you go!</h1>
        <UnsubButton></UnsubButton>
      </section>
    </>
  )
}

export default Unsubscribe
