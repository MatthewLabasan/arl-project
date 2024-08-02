import { useState } from "react"
import './SignUpForm.css'

const SignUpForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [keyword, setKeyword] = useState('')
   
    const handleSubmit = (e) => {
        e.preventDefault() // prevent refresh
        const user = { name, email, keyword } // create json 
        console.log(user)
        
        fetch('http://localhost:3500/users', { // fetch is async
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user) // turn object into string
        }).then((res) => {
            console.log(res.text())
        })
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
            <p>{name}, {email}, {keyword}</p>
        </section>
    )
}

export default SignUpForm