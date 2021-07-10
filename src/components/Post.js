import React from 'react'
import {Card, CardContent, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        maxWidth: '50%',
        margin: '2rem auto 1rem auto',
        background: 'rgba(0,0,0, .1)',
        
    },
    info: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    text: {
        wordBreak: 'break-word'
    }
})

const Post = ({username, body, date}) => {
    const classes = useStyles()

    return (
        <Card elevation={3} className={classes.root}>
            <CardContent>
                <Typography className={classes.text} variant="h5">{body}</Typography>
            </CardContent>
            <CardContent className={classes.info}>
                <Typography variant="body2">{new Date(date).toUTCString()}</Typography>
                <Typography variant="body1">{username}</Typography>
            </CardContent>
        </Card>
    )
}

export default Post
