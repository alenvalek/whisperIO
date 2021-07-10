import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        display: 'block',
        marginTop: '10rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '10%'
    }
})

const Spinner = () => {

    const classes = useStyles()

    return (
        <div>
            <img className={classes.root} alt="Loading data" src="https://i.redd.it/o6m7b0l6h6pz.gif"></img>
        </div>
    )
}

export default Spinner
