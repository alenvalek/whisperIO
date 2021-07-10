import React, { useRef, useState } from 'react'
import {FormGroup, FormControl, Card, Button, CardContent, Typography, TextField } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    btn: {
        width: '100%',
        marginTop: '1rem',
    },
    box: {
        textAlign: 'center',
        marginTop: '2rem',
        width: '100%'
    },
    alert: {
        marginBottom: '1rem',
    }
});


const SignUp = () => {

    const classes = useStyles()
    
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

        console.log({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            currentPassword: passwordRef.current.value,
            passwordConfirmation: passwordConfRef.current.value
        })

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
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h3" className={classes.root}>Sign Up</Typography>
                    {error && 
                    <Alert severity="error" className={classes.alert}>
                        <AlertTitle><strong>Error</strong></AlertTitle>
                        {error}
                    </Alert>}
                    <form onSubmit={handleSubmit}>
                        <FormGroup id="username">
                            <FormControl margin="normal" >
                                <TextField id="username" type="username" variant="standard" inputRef={usernameRef} label="Username" required />
                            </FormControl>
                        </FormGroup>

                        <FormGroup id="email" margin="normal" >
                            <FormControl >
                                <TextField id="email" type="email" variant="standard" inputRef={emailRef} label="Email" required />
                            </FormControl>
                        </FormGroup>

                    
                        <FormGroup id="password">
                            <FormControl margin="normal">
                                <TextField id="password" type="password" variant="standard" inputRef={passwordRef} label="Password" required />
                            </FormControl>
                        </FormGroup>
                    
                    
                        <FormGroup id="passwordConfirm">
                            <FormControl margin="normal" >
                                <TextField id="passwordConf" type="password" variant="standard" inputRef={passwordConfRef} label="Confirm password" required />
                            </FormControl>
                        </FormGroup>

                        <Button type="submit" disabled={loading} color="primary" variant="contained" className={classes.btn}>Sign Up</Button>
                    </form>
                </CardContent>
            </Card>

            <div className={classes.box}>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default SignUp
