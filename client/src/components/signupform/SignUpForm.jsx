import { useState } from "react"
import './SignUpForm.css'

const SignUpForm = () => {


    const onSubmit = () => {
        // send api request to update database
    }
    return (
        <section className = "sign-up-form">
            <form onSubmit={onSubmit}>
                <h2>Sign Up</h2>
                <div className="input-box"></div>
                    <label>Name</label>
                    <input type="text" className="field" placeholder="Enter your name" required></input>
                <div className="input-box"></div>
                    <label>Email</label>
                    <input type="email" className="field" placeholder="Enter your email" required></input>
                <div className="input-box">
                    <label>Topic</label>
                    <input type="text" className="field" placeholder="Enter your topic" required></input>
                    <label className="topic-note">Please input a singular word. Ex: Instead of "Artificial Intelligence", input "AI"</label>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </section>
    )
}