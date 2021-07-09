import React, {useState} from 'react'
import {Alert, Button, Card} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const Dashboard = () => {

    const history = useHistory()
    const {currentUser, logout, updateProfile} = useAuth()

    const [error, setError] = useState("")

    const setUserName = (username) => {
        updateProfile(username)
    }

    const handleLogOut = async () => {
        setError("")
        try {
            await logout()
            history.push("/login")
        }
        catch(err) {
            setError("Failed to log out")
        }
    }
    return (
        <>
            <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">Profile</h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                   <strong>Username: </strong> {!currentUser.displayName ? "not set" : <>{currentUser.displayName}</>} <br/>
                   <strong>Email: </strong> {currentUser.email}
                   <br/>
                   <strong>Password: </strong> For privacy reasons we cannot disclose passwords with our users 
                   <br/>
                   <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>
               </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogOut}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
