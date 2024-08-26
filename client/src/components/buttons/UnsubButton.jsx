import { useState } from "react"
import './RequestButton.css'

/** 
* Button for unsubscribing. Sends PATCH request to 'users' API, removing keywordID from user and userID from keyword.
* Will successfully PATCH if the URL contains the following queries: keyword=<keyword>&unsubAuthToken=<token>
*/
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
            const response = await fetch('https://scibyte-backend.onrender.com/users', { 
                method: 'PATCH',
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(user) // turn object into string
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

/** 
* Returns status of unsub PATCH request once it is complete
*/
const StatusMessage = ({status, received}) => {
    if(received) {
        return <p>{status}</p>
    } 
    return null
}

export default UnsubButton