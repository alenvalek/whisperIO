import React, { useRef, useState } from 'react'
import { FormGroup, FormControl, Card, Button, CardContent, Typography, TextField } from '@material-ui/core'
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


const Login = () => {
    
    const classes = useStyles();

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
            setError("Failed to login into an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h3" className={classes.root}>Log In</Typography>
                    {error && 
                    <Alert severity="error" className={classes.alert}>
                        <AlertTitle><strong>Error</strong></AlertTitle>
                            {error}
                    </Alert>}
                    <form onSubmit={handleSubmit}>
                        
                        <FormGroup id="email" >
                            <FormControl >
                                <TextField id="email" type="email" variant="standard" inputRef={emailRef} label="Email" required />
                            </FormControl>
                        </FormGroup>

                    
                        <FormGroup id="password" >
                            <FormControl margin="normal">
                                <TextField id="password" type="password" variant="standard" inputRef={passwordRef} label="Password" required />
                            </FormControl>
                        </FormGroup>
                        <Button type="submit" disabled={loading} color="primary" variant="contained" className={classes.btn}>Log In</Button>
                    </form>
                </CardContent>
            </Card>
            <div className={classes.box}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login
