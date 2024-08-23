import { useState } from "react"
import './RequestButton.css'

const StatusMessage = ({status, received}) => {
    if(received) {
        return <p>{status}</p>
    } 
    return null
}

const UnsubButton = () => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [received, setReceived] = useState(false)

    // get auth token & keyword from url
    var params = new URL(window.location.toString()).searchParams
    const unsubAuthToken = params.get("token")
    const keyword = params.get("keyword")
   
    const handleClick = async (e) => { // e = event object to be modified
        e.preventDefault() // prevent refresh on submit

        const user = { keyword, unsubAuthToken } // create json 
        
        try {
            const response = await fetch('http://localhost:3500/users', { 
                method: 'PATCH',
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(user) // turn object into string. payload
            })
            const json = await response.json()
            setReceived(true)
            setStatus(json.message)
        } catch (error) {
            console.log(error.message)
            setReceived(true)
            setStatus(`An error occurred. ${error}`)
        }
    }

    if(keyword && unsubAuthToken) {
        return (
            <section>
                <button className="submit" onClick={handleClick}>Unsubscribe from '{keyword}'</button>
                <StatusMessage status={status} received={received}></StatusMessage>
            </section>
        )
    } else {
        return (
            <section>
                <h2>Oops!</h2>
                <p>Please try unsubscribing using the link in your newsletter.</p>
                <br></br>
                <a className="redirect" href="/home">Go Back Home</a>
            </section>
        )
    }
}

export default UnsubButton