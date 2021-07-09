import React, { useRef, useState } from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const SignUp = () => {
    
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()

    const history = useHistory()

    const {signup} = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfRef.current.value)
        {
            return setError("Password do not match")
        }

        try {
            
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
            setError("")
            history.push("/dashboard")
        }
        catch(err) {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" ref={usernameRef} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                    
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                    

                    
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfRef} required />
                        </Form.Group>

                        <Button type="submit" disabled={loading} className="w-100 mt-2">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default SignUp
