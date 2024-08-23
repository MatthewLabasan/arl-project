import { useState } from "react"
import './SignUpForm.css'

const StatusMessage = ({status, received}) => {
    if(received) {
        return <p>{status}</p>
    } 
    return null
}

const SignUpForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [keyword, setKeyword] = useState('')
    const [status, setStatus] = useState('')
    const [received, setReceived] = useState(false)
   
    const handleSubmit = async (e) => { // e = event object to be modified
        e.preventDefault() // prevent refresh on submit
        const user = { name, email, keyword } // create json 
        console.log(user)
        
        try {
            const response = await fetch('http://localhost:3500/users', { 
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // tells format of body
                body: JSON.stringify(user) // turn object into string. payload
            })
            const json = await response.json()
            setReceived(true)
            setStatus(json.userMessage)
        } catch (error) {
            console.log(error.userMessage)
            setReceived(true)
            setStatus(`An error occurred. ${error}`)
        }
    }

    return (
        <section className = "sign-up-form">
            <form onSubmit={handleSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="input-box">
                    <label>Name</label>
                    <input 
                        type="text" 
                        className="field" 
                        placeholder="Enter your name" 
                        name="name" 
                        required 
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div className="input-box">
                    <label>Email</label> 
                    <input 
                        type="email" 
                        className="field" 
                        placeholder="Enter your email" 
                        name="email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}>
                        </input>
                </div>
                <div className="input-box">
                    <label>Topic</label> 
                    <input 
                        type="text" 
                        className="field" 
                        placeholder="Enter your topic (single word)" 
                        pattern="^[^\s]+$" 
                        name="keyword" 
                        required
                         onChange={(e) => setKeyword(e.target.value)}>
                        </input>
                </div>
                <button className="submit" type="submit">Subscribe</button>
            </form>
            <StatusMessage status={status} received={received}></StatusMessage>
        </section>
    )
}

export default SignUpForm