import React, { useState } from 'react'
import {Button, TextField, makeStyles, Container} from '@material-ui/core'
import { useAuth } from '../contexts/AuthContext'
import {db} from '../firebase'
import {v4 as uuid} from 'uuid'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '50%',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '1rem'
    },
    btn: {
        marginTop: '1rem',
    }
})


const PostForm = ({posts, setPosts}) => {

    const [body, setBody] = useState("")
    const classes = useStyles()
    const {currentUser} = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()

        const newPost = {
            id: uuid(),
            userID: currentUser.uid,
            username: currentUser.displayName,
            body: body,
            createdAt: Date.now()
        }

        try {
            await db.collection("userPosts").doc().set(newPost)
            setPosts([newPost,...posts])
            console.log("Successfully created a post!")
        } catch (error) {
            console.log(error)
            console.log("Post creation failed!")
        }
        
    }        
    return (
        <>
            <Container>
                <div>
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <TextField type="text" variant="outlined" multiline rows={6} onChange={e => setBody(e.target.value)} placeholder="What's on your mind?"/>
                        <Button className={classes.btn} type="submit" variant="contained" color="primary">Post</Button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default PostForm
