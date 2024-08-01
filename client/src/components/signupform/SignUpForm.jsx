import { useState } from "react"
import './SignUpForm.css'

const SignUpForm = () => {
    const onSubmit = () => {
        // send api request to update database
    }

    return (
        <section className = "sign-up-form">
            <form onSubmit={onSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="input-box">
                    <label>Name</label>
                    <input type="text" className="field" placeholder="Enter your name" required></input>
                </div>
                <div className="input-box">
                    <label>Email</label> 
                    <input type="email" className="field" placeholder="Enter your email" required></input>
                </div>
                <div className="input-box">
                    <label>Topic</label> 
                    <input type="text" className="field" placeholder="Enter your topic (single word)" pattern="^[^\s]+$" required></input>
                </div>
                <button className="submit" type="submit">Subscribe</button>
            </form>
        </section>
    )
}

export default SignUpForm