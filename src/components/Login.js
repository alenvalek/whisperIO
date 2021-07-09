import React, { useRef, useState } from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const Login = () => {
    
    const emailRef = useRef()
    const passwordRef = useRef()

    const {login} = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setError("")
            history.push("/dashboard")
        }
        catch(err) {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                    
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                    
                        <Button type="submit" disabled={loading} className="w-100 mt-2">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login
