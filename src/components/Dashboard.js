import { Button,Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {Alert} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { storage } from '../firebase'
import {v4 as uuid} from 'uuid'


const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    textS: {
        marginLeft: '23rem'
    },
    img: {
        float: 'left'
    },
    spacing: {
        marginTop: '1rem',
        marginLeft: '23rem'
    }
});

const Dashboard = () => {

    const classes = useStyles()

    const history = useHistory()
    const {currentUser, logout, updateProfilePicture} = useAuth()

    const [image, setImage] = useState(null)
    const [pfp, setPfp] = useState("https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg")

    const [error, setError] = useState("")

    useEffect(() => {
        if(currentUser){
            setPfp(currentUser.photoURL)
        }
    }, [currentUser])

    const handleUpload = () => {
        const imageID = uuid()

        const uploadTask = storage.ref(`images/${imageID}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("images").child(imageID).getDownloadURL().then(url => {
                    updateProfilePicture(url)
                    setPfp(url);
                    setImage(null);
                })
            }
        )
    }

    const handleChangeFile = e => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    // THIS CODE NEEDS REFACTORING! 
    // const setUserName = (username) => {
    //     updateProfile(username)
    // }

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

    // const debug = () => {
    //     console.log(image)
    // }

    return (
        <>
            <Card elevation={3}>
               <CardContent>
                   <Typography variant="h3">Profile</Typography>
                   <img alt={`${currentUser.displayName}'s_profile_pic`} className={classes.img} src={pfp} width="350" height="350"/>
                   {error && <Alert variant="danger">{error}</Alert>}
                   <div className={classes.textS}>
                    <Typography variant="body1"><strong>Username: </strong> <span>{currentUser.displayName}</span></Typography> 
                    <Typography variant="body1"><strong>Email: </strong> <span>{currentUser.email}</span></Typography>
                    <Typography variant="body1"><strong>Password: </strong> For privacy reasons we cannot disclose passwords with our users </Typography>
                   </div>
                   <div className={classes.spacing}>
                    <input type="file" onChange={handleChangeFile} />
                    <Button variant="contained" color="primary" onClick={handleUpload}>Set profile picture</Button>
                   </div>
               </CardContent>
            </Card>
            <div>
                <Button variant="contained" color="secondary" onClick={handleLogOut}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
